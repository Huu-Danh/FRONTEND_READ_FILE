import { useState } from "react";

type Passenger = { lastName: string; firstName: string };
type Result = { bookingCode: string; passengers: Passenger[] };

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!file) {
      setError("Vui lòng chọn file trước khi phân tích.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const resp = await fetch("https://localhost:7053/api/Parse/upload", {
        method: "POST",
        body: fd,
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Server error" }));
        throw new Error(err?.error ?? "Lỗi server");
      }

      const data = await resp.json();
      setResult({
        bookingCode: data.bookingCode ?? "",
        passengers: data.passengers ?? [],
      });
    } catch (e: any) {
      setError(e.message ?? "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow max-w-4xl mx-auto w-full p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          ✈️ Ticket Parser Demo
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 justify-center">
          <input
            type="file"
            accept=".doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={onSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg shadow disabled:opacity-60"
          >
            {loading ? "Đang phân tích..." : "Phân tích"}
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-center font-medium mb-4">
            ⚠️ {error}
          </div>
        )}

        {result && (
          <div className="mt-6 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <h2 className="text-lg font-semibold">Kết quả phân tích</h2>
              <p className="text-sm opacity-90">Danh sách hành khách</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-blue-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left font-semibold">Họ</th>
                    <th className="p-3 text-left font-semibold">Tên</th>
                    <th className="p-3 text-left font-semibold">Mã đặt chỗ</th>
                  </tr>
                </thead>
                <tbody>
                  {result.passengers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="p-4 text-center text-gray-500 bg-white"
                      >
                        Không tìm thấy hành khách nào.
                      </td>
                    </tr>
                  ) : (
                    result.passengers.map((p, idx) => (
                      <tr
                        key={idx}
                        className={`${
                          idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                        } hover:bg-blue-100 transition`}
                      >
                        <td className="p-3 font-semibold text-gray-700">
                          {p.lastName}
                        </td>
                        <td className="p-3 text-gray-700">{p.firstName}</td>
                        <td className="p-3 text-gray-700">
                          {result.bookingCode}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gray-100 py-3 text-center text-sm text-gray-600 border-t">
        © {new Date().getFullYear()} Nguyễn Tấn Hữu Danh. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
