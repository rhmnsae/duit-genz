import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useMemo, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { isSupabaseReady, saveSplitBill, saveTransaction } from './src/lib/supabase';

const money = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

const categories = ['makan', 'nongkrong', 'transport', 'jajan', 'tagihan', 'gajian'];

const sampleTransactions = [
  { id: '1', title: 'Kopi susu + roti', amount: 28000, category: 'nongkrong', type: 'expense', source: 'chat' },
  { id: '2', title: 'Gajian freelance', amount: 450000, category: 'gajian', type: 'income', source: 'manual' },
  { id: '3', title: 'Ojol pulang', amount: 17000, category: 'transport', type: 'expense', source: 'photo' },
];

function BrutalCard({ children, color = 'bg-white', className = '' }) {
  return <View className={`${color} border-[3px] border-ink shadow-brutal rounded-none p-4 ${className}`}>{children}</View>;
}

function PixelButton({ children, color = 'bg-ink', text = 'text-paper', onPress }) {
  return (
    <Pressable onPress={onPress} className={`${color} border-[3px] border-ink shadow-brutalSm px-4 py-3 active:translate-x-1 active:translate-y-1`}>
      <Text className={`${text} text-center font-black uppercase`}>{children}</Text>
    </Pressable>
  );
}

function parseChatInput(text) {
  const amountMatch = text.replace(/\./g, '').match(/(\d+)\s*(rb|ribu|k|000)?/i);
  const amount = amountMatch ? Number(amountMatch[1]) * (/rb|ribu|k/i.test(amountMatch[2] || '') ? 1000 : 1) : 0;
  const lower = text.toLowerCase();
  const category = categories.find((cat) => lower.includes(cat)) || (lower.includes('kopi') ? 'nongkrong' : 'lainnya');
  const type = lower.includes('gaji') || lower.includes('masuk') || lower.includes('dibayar') ? 'income' : 'expense';
  return { title: text || 'Catatan baru', amount, category, type, source: 'chat' };
}

export default function App() {
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [chatText, setChatText] = useState('tadi beli kopi 18rb');
  const [receipt, setReceipt] = useState(null);
  const [splitTotal, setSplitTotal] = useState('156000');
  const [people, setPeople] = useState('Sae, Dya, Raka');

  const summary = useMemo(() => {
    const income = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0);
    const expense = transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const splitNames = people.split(',').map((name) => name.trim()).filter(Boolean);
  const splitEach = splitNames.length ? Number(splitTotal || 0) / splitNames.length : 0;

  async function addFromChat() {
    const parsed = parseChatInput(chatText);
    if (!parsed.amount) return Alert.alert('Oops', 'Nominalnya belum kebaca. Coba tulis: beli kopi 18rb');
    const item = { id: String(Date.now()), ...parsed };
    setTransactions((prev) => [item, ...prev]);
    if (isSupabaseReady) await saveTransaction(parsed);
    setChatText('');
  }

  async function pickReceipt() {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (result.canceled) return;
    const uri = result.assets[0].uri;
    setReceipt(uri);
    const item = { id: String(Date.now()), title: 'Struk baru (OCR soon)', amount: 0, category: 'makan', type: 'expense', source: 'photo' };
    setTransactions((prev) => [item, ...prev]);
    Alert.alert('Foto masuk', 'MVP: fotonya sudah dipilih. Next step: OCR lokal/Tesseract buat baca total otomatis.');
  }

  async function saveSplit() {
    const payload = {
      title: 'Split bill nongkrong',
      total: Number(splitTotal || 0),
      participants: splitNames.map((name) => ({ name, amount: splitEach })),
      items: [],
      status: 'draft',
    };
    if (isSupabaseReady) await saveSplitBill(payload);
    Alert.alert('Split bill siap', `${splitNames.length} orang, masing-masing ${money.format(splitEach)}`);
  }

  return (
    <View className="flex-1 bg-paper">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" contentContainerClassName="px-4 pb-10 pt-14 gap-5">
        <View className="flex-row items-center justify-between gap-3">
          <View>
            <Text className="text-4xl font-black text-ink tracking-tighter">Duit GenZ</Text>
            <Text className="text-muted font-bold mt-1">catat duit tanpa ribet, bestie.</Text>
          </View>
          <View className="bg-banana border-[3px] border-ink shadow-brutalSm px-3 py-2">
            <Text className="font-black">8BIT</Text>
          </View>
        </View>

        <BrutalCard color="bg-sky">
          <Text className="font-black text-lg">Saldo vibes kamu</Text>
          <Text className="text-4xl font-black tracking-tighter mt-2">{money.format(summary.balance)}</Text>
          <View className="flex-row gap-3 mt-4">
            <View className="flex-1 bg-mint border-[3px] border-ink p-3">
              <Text className="font-black">Masuk</Text>
              <Text className="font-bold">{money.format(summary.income)}</Text>
            </View>
            <View className="flex-1 bg-bubblegum border-[3px] border-ink p-3">
              <Text className="font-black">Keluar</Text>
              <Text className="font-bold">{money.format(summary.expense)}</Text>
            </View>
          </View>
        </BrutalCard>

        <BrutalCard color="bg-banana">
          <Text className="font-black text-xl">Chatbot catatan</Text>
          <Text className="text-muted font-bold mb-3">Ketik natural aja: “beli seblak 15rb”, nanti kesimpen.</Text>
          <TextInput value={chatText} onChangeText={setChatText} placeholder="contoh: makan ayam geprek 22rb" className="bg-white border-[3px] border-ink px-4 py-3 font-bold mb-3" />
          <PixelButton onPress={addFromChat}>Simpan dari chat</PixelButton>
        </BrutalCard>

        <BrutalCard>
          <Text className="font-black text-xl">Foto struk</Text>
          <Text className="text-muted font-bold mb-3">Tinggal foto/upload bukti bayar. OCR otomatis disiapin di next step.</Text>
          {receipt && <Image source={{ uri: receipt }} className="h-40 border-[3px] border-ink mb-3" resizeMode="cover" />}
          <PixelButton color="bg-mint" text="text-ink" onPress={pickReceipt}>Pilih foto struk</PixelButton>
        </BrutalCard>

        <BrutalCard color="bg-bubblegum">
          <Text className="font-black text-xl">Split bill anti drama</Text>
          <Text className="text-ink font-bold mb-3">Masukin total + nama temen, langsung kebagi.</Text>
          <TextInput value={splitTotal} onChangeText={setSplitTotal} keyboardType="numeric" placeholder="Total bill" className="bg-white border-[3px] border-ink px-4 py-3 font-bold mb-3" />
          <TextInput value={people} onChangeText={setPeople} placeholder="Sae, Dya, Raka" className="bg-white border-[3px] border-ink px-4 py-3 font-bold mb-3" />
          <View className="bg-white border-[3px] border-ink p-3 mb-3">
            <Text className="font-black">{splitNames.length || 0} orang • {money.format(splitEach)} / orang</Text>
          </View>
          <PixelButton onPress={saveSplit}>Bikin split</PixelButton>
        </BrutalCard>

        <Text className="text-2xl font-black tracking-tighter mt-2">Riwayat terbaru</Text>
        {transactions.map((item) => (
          <View key={item.id} className="bg-white border-[3px] border-ink shadow-brutalSm p-4 flex-row justify-between items-center">
            <View className="flex-1 pr-3">
              <Text className="font-black text-base">{item.title}</Text>
              <Text className="font-bold text-muted">#{item.category} • via {item.source}</Text>
            </View>
            <Text className={`font-black ${item.type === 'income' ? 'text-green-700' : 'text-red-600'}`}>{item.type === 'income' ? '+' : '-'}{money.format(item.amount)}</Text>
          </View>
        ))}

        <BrutalCard color="bg-darkcard">
          <Text className="text-paper font-black text-xl">Roadmap fitur lengkap</Text>
          <Text className="text-[#fff8db] font-bold mt-2 leading-6">Budget bulanan, kategori otomatis, reminder tagihan, insight boncos, export laporan, OCR struk, auth Supabase, dan dashboard web admin.</Text>
        </BrutalCard>
      </ScrollView>
    </View>
  );
}
