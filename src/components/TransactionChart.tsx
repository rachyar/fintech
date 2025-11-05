// src/components/TransactionChart.tsx

"use client"; // Komponen ini interaktif, jadi harus "use client"

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

// Tentukan tipe data yang akan diterima
interface ChartData {
  name: string;
  total: number;
}

export default function TransactionChart({ data }: { data: ChartData[] }) {
  return (
    <div className="h-80 w-full"> {/* Tentukan tinggi kontainer */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis 
            dataKey="name" 
            stroke="#9ca3af" // Warna label (gray)
            fontSize={12} 
          />
          <YAxis 
            stroke="#9ca3af" 
            fontSize={12} 
            tickFormatter={(value) => `Rp ${value / 1000}k`} // Format jadi 'Rp 5000k'
          />
          <Tooltip 
            cursor={{ fill: 'rgba(100, 100, 100, 0.1)' }}
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#f3f4f6' }}
            formatter={(value: number) => [new Intl.NumberFormat('id-ID').format(value), 'Total']}
          />
          <Bar 
            dataKey="total" 
            fill="#22d3ee" // Warna cyan
            radius={[4, 4, 0, 0]} // Sudut melengkung di atas
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}