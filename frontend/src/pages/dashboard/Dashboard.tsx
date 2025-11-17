import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import ProductsPerCategoryChart from "../../components/charts/ProductsPerCategoryChart";

export default function Dashboard() {
  const metrics = [
    { label: "Total Sales", value: "$120,863.00", diff: "+8%" },
    { label: "Customers", value: "1,520", diff: "+20%" },
    { label: "Page Views", value: "57,572", diff: "-15%" },
  ];

  const chartData = [
    { category: "Eletrônicos", value: 20 },
    { category: "Vestuário", value: 12 },
    { category: "Casa", value: 8 },
    { category: "Escritório", value: 6 },
  ];

  return (
    <div className="flex bg-[#f6f6f9] h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-10 space-y-10">

          {/* PAGE TITLE */}
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          {/* ===== METRICS ===== */}
          <section className="grid grid-cols-3 gap-6">
            {metrics.map((m) => (
              <Card
                key={m.label}
                className="rounded-2xl shadow-sm border bg-white"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-muted-foreground text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {m.label}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-3xl font-bold">{m.value}</p>
                  <p
                    className={`text-xs mt-1 ${
                      m.diff.startsWith("+")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {m.diff} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* ===== CHART SECTION ===== */}
          <section className="grid grid-cols-3 gap-6">

            {/* SALES CHART */}
            <Card className="col-span-2 rounded-2xl shadow-sm border bg-white">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Sales Insight
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ProductsPerCategoryChart data={chartData} />
              </CardContent>
            </Card>

            {/* LOW STOCK */}
            <Card className="col-span-1 rounded-2xl shadow-sm border bg-white">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Low Stock Products
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Fone Bluetooth</span>
                    <span className="font-semibold text-red-500">2 pcs</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Cabo USB-C</span>
                    <span className="font-semibold text-red-500">3 pcs</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Teclado RGB</span>
                    <span className="font-semibold text-red-500">4 pcs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

          </section>
        </main>
      </div>
    </div>
  );
}
