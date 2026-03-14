import "./shared-dashboard-styles.css";

export default function DashboardsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="energy-pages">{children}</div>;
}
