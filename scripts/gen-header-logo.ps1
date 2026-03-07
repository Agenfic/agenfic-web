$ErrorActionPreference = "Stop"

$raw = Get-Content -Path "_bs_component.txt" -Raw

$constMatch = [regex]::Match(
  $raw,
  "consts:\[(?<consts>.+?)\],template:function",
  [System.Text.RegularExpressions.RegexOptions]::Singleline
)

if (-not $constMatch.Success) {
  throw "Could not find consts block for agenfic-logo."
}

$templateMatch = [regex]::Match(
  $raw,
  "template:function\(t,i\)\{t&1&&\((?<ops>.+?)\),t&2&&",
  [System.Text.RegularExpressions.RegexOptions]::Singleline
)

if (-not $templateMatch.Success) {
  throw "Could not find template block for agenfic-logo."
}

$constBlock = $constMatch.Groups["consts"].Value
$ops = $templateMatch.Groups["ops"].Value

function Get-TopLevelArrays {
  param([string]$InputText)

  $result = New-Object System.Collections.Generic.List[string]
  $depth = 0
  $start = -1
  $inString = $false
  $escape = $false

  for ($i = 0; $i -lt $InputText.Length; $i++) {
    $ch = $InputText[$i]

    if ($inString) {
      if ($escape) {
        $escape = $false
        continue
      }
      if ($ch -eq "\") {
        $escape = $true
        continue
      }
      if ($ch -eq '"') {
        $inString = $false
      }
      continue
    }

    if ($ch -eq '"') {
      $inString = $true
      continue
    }

    if ($ch -eq "[") {
      if ($depth -eq 0) {
        $start = $i
      }
      $depth++
      continue
    }

    if ($ch -eq "]") {
      $depth--
      if ($depth -eq 0 -and $start -ge 0) {
        $result.Add($InputText.Substring($start, $i - $start + 1))
        $start = -1
      }
      continue
    }
  }

  return $result
}

function Parse-AttrTokens {
  param([object[]]$Tokens)

  $attrs = [ordered]@{}
  $styles = New-Object System.Collections.Generic.List[string]
  $mode = "attrs"
  $index = 0

  while ($index -lt $Tokens.Count) {
    $token = $Tokens[$index]

    if ($token -is [int] -or $token -is [long]) {
      if ([int]$token -eq 2) {
        $mode = "styles"
      }
      $index++
      continue
    }

    if ($index + 1 -ge $Tokens.Count) {
      break
    }

    $key = [string]$Tokens[$index]
    $value = [string]$Tokens[$index + 1]

    if ($mode -eq "styles") {
      $styles.Add(("{0}: {1};" -f $key, $value))
    } else {
      $attrs[$key] = $value
    }

    $index += 2
  }

  if ($styles.Count -gt 0) {
    $attrs["style"] = [string]::Join(" ", $styles)
  }

  return $attrs
}

function Parse-InvocationArgs {
  param([string]$ArgText)

  if ([string]::IsNullOrWhiteSpace($ArgText)) {
    return @()
  }

  return ConvertFrom-Json -InputObject ("[" + $ArgText + "]")
}

function Next-Invocation {
  param(
    [string]$InputText,
    [ref]$Position,
    [ref]$LastFn
  )

  $len = $InputText.Length

  while ($Position.Value -lt $len) {
    $ch = $InputText[$Position.Value]
    if ([char]::IsWhiteSpace($ch) -or $ch -eq ",") {
      $Position.Value++
      continue
    }
    break
  }

  if ($Position.Value -ge $len) {
    return $null
  }

  $fn = $null
  $cursor = $Position.Value
  $ch0 = $InputText[$cursor]

  if ([char]::IsLetter($ch0) -or $ch0 -eq "_") {
    $j = $cursor
    while ($j -lt $len) {
      $cj = $InputText[$j]
      if ([char]::IsLetterOrDigit($cj) -or $cj -eq "_") {
        $j++
      } else {
        break
      }
    }
    $fn = $InputText.Substring($cursor, $j - $cursor)
    $cursor = $j
  } elseif ($ch0 -eq "(") {
    $fn = $LastFn.Value
  } else {
    $Position.Value++
    return Next-Invocation -InputText $InputText -Position $Position -LastFn $LastFn
  }

  if ($cursor -ge $len -or $InputText[$cursor] -ne "(") {
    $Position.Value = $cursor
    return Next-Invocation -InputText $InputText -Position $Position -LastFn $LastFn
  }

  $depth = 1
  $inString = $false
  $escape = $false
  $k = $cursor + 1

  while ($k -lt $len -and $depth -gt 0) {
    $ck = $InputText[$k]

    if ($inString) {
      if ($escape) {
        $escape = $false
      } elseif ($ck -eq "\") {
        $escape = $true
      } elseif ($ck -eq '"') {
        $inString = $false
      }
      $k++
      continue
    }

    if ($ck -eq '"') {
      $inString = $true
      $k++
      continue
    }

    if ($ck -eq "(") {
      $depth++
      $k++
      continue
    }

    if ($ck -eq ")") {
      $depth--
      if ($depth -eq 0) {
        break
      }
      $k++
      continue
    }

    $k++
  }

  if ($k -ge $len) {
    throw "Unclosed invocation near position $cursor."
  }

  $args = $InputText.Substring($cursor + 1, $k - $cursor - 1)
  $Position.Value = $k + 1

  if ($fn) {
    $LastFn.Value = $fn
  }

  return [pscustomobject]@{
    Name = $fn
    Args = $args
  }
}

function Format-Attrs {
  param([hashtable]$Attrs)

  if (-not $Attrs -or $Attrs.Count -eq 0) {
    return ""
  }

  $parts = New-Object System.Collections.Generic.List[string]
  foreach ($entry in $Attrs.GetEnumerator()) {
    $key = [string]$entry.Key
    $value = [string]$entry.Value
    $safeValue = $value.Replace("&", "&amp;").Replace('"', "&quot;").Replace("<", "&lt;").Replace(">", "&gt;")
    $parts.Add(('{0}="{1}"' -f $key, $safeValue))
  }

  return " " + ([string]::Join(" ", $parts))
}

$constArrays = Get-TopLevelArrays -InputText $constBlock
$constMap = @{}
for ($i = 0; $i -lt $constArrays.Count; $i++) {
  $tokens = ConvertFrom-Json -InputObject $constArrays[$i]
  $constMap[$i] = Parse-AttrTokens -Tokens $tokens
}

$builder = New-Object System.Text.StringBuilder
$stack = New-Object System.Collections.Generic.Stack[string]
$depth = 0
$position = 0
$lastFn = $null
$invocationCount = 0
$reCount = 0
$_tCount = 0
$veCount = 0

while ($true) {
  $invocation = Next-Invocation -InputText $ops -Position ([ref]$position) -LastFn ([ref]$lastFn)
  if (-not $invocation) {
    break
  }

  $invocationCount++

  $fn = $invocation.Name
  $callArgs = Parse-InvocationArgs -ArgText $invocation.Args

  switch ($fn) {
    "Re" {
      $reCount++
      if ($callArgs.Count -lt 2) {
        continue
      }

      $tag = [string]$callArgs[1]
      $constIndex = if ($callArgs.Count -ge 3) { [int]$callArgs[2] } else { $null }
      $attrs = [ordered]@{}

      if ($null -ne $constIndex -and $constMap.ContainsKey($constIndex)) {
        foreach ($pair in $constMap[$constIndex].GetEnumerator()) {
          $attrs[$pair.Key] = $pair.Value
        }
      }

      if ($tag -eq "svg") {
        $attrs["viewBox"] = "0 0 869 113"
        $attrs["height"] = "21"
        $attrs["width"] = "161.49"
      }

      [void]$builder.Append((" " * ($depth * 2)))
      [void]$builder.Append("<" + $tag + (Format-Attrs -Attrs $attrs) + ">")
      [void]$builder.Append("`n")

      $stack.Push($tag)
      $depth++
      continue
    }

    "_t" {
      $_tCount++
      if ($callArgs.Count -lt 2) {
        continue
      }

      $tag = [string]$callArgs[1]
      $constIndex = if ($callArgs.Count -ge 3) { [int]$callArgs[2] } else { $null }
      $attrs = [ordered]@{}

      if ($null -ne $constIndex -and $constMap.ContainsKey($constIndex)) {
        foreach ($pair in $constMap[$constIndex].GetEnumerator()) {
          $attrs[$pair.Key] = $pair.Value
        }
      }

      [void]$builder.Append((" " * ($depth * 2)))
      [void]$builder.Append("<" + $tag + (Format-Attrs -Attrs $attrs) + "></" + $tag + ">")
      [void]$builder.Append("`n")
      continue
    }

    "Ve" {
      $veCount++
      if ($stack.Count -eq 0) {
        continue
      }

      $depth = [Math]::Max(0, $depth - 1)
      $tag = $stack.Pop()
      [void]$builder.Append((" " * ($depth * 2)))
      [void]$builder.Append("</" + $tag + ">")
      [void]$builder.Append("`n")
      continue
    }

    default {
      continue
    }
  }
}

$rawSvgMarkup = $builder.ToString()
$svgMarkup = $rawSvgMarkup.Trim()

if ([string]::IsNullOrWhiteSpace($svgMarkup)) {
  throw "Generated SVG is empty."
}

$out = @'
const HEADER_LOGO_SVG = String.raw`
__SVG__
`;

export default function AgenficHeaderLogo() {
  return <agenfic-logo className="logo" dangerouslySetInnerHTML={{ __html: HEADER_LOGO_SVG }} />;
}
'@

$out = $out.Replace("__SVG__", $svgMarkup)

Set-Content -Path "components\\agenfic-header-logo.tsx" -Value $out -Encoding utf8
Write-Output ("Generated SVG with {0} characters." -f $svgMarkup.Length)
