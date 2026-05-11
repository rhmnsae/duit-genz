import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useMemo, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { isSupabaseReady, saveSplitBill, saveTransaction } from './src/lib/supabase';

const money = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

const categories = ['makan', 'nongkrong', 'transport', 'jajan', 'tagihan', 'gajian'];

const budgets = [
  ['Makan', 760000, 1200000, '63%'],
  ['Nongkrong', 420000, 500000, '84%'],
  ['Transport', 210000, 400000, '52%'],
  ['Jajan', 310000, 350000, '89%'],
];

const goals = [
  ['Dana darurat', 2400000, 5000000],
  ['HP baru', 1300000, 3000000],
  ['Liburan', 850000, 2000000],
];

const bills = [
  ['Kos', '12 Mei', 750000],
  ['Internet', '15 Mei', 180000],
  ['Spotify', '21 Mei', 55000],
];

const sampleTransactions = [
  { id: '1', title: 'Kopi susu + roti', amount: 28000, category: 'nongkrong', type: 'expense', source: 'chat' },
  { id: '2', title: 'Gajian freelance', amount: 450000, category: 'gajian', type: 'income', source: 'manual' },
  { id: '3', title: 'Ojol pulang', amount: 17000, category: 'transport', type: 'expense', source: 'photo' },
  { id: '4', title: 'Split bill ramen', amount: 52000, category: 'makan', type: 'expense', source: 'split_bill' },
];

function parseChatInput(text) {
  const amountMatch = text.replace(/\./g, '').match(/(\d+)\s*(rb|ribu|k|000)?/i);
  const amount = amountMatch ? Number(amountMatch[1]) * (/rb|ribu|k/i.test(amountMatch[2] || '') ? 1000 : 1) : 0;
  const lower = text.toLowerCase();
  const category = categories.find((cat) => lower.includes(cat)) || (lower.includes('kopi') ? 'nongkrong' : 'lainnya');
  const type = lower.includes('gaji') || lower.includes('masuk') || lower.includes('dibayar') ? 'income' : 'expense';
  return { title: text || 'Catatan baru', amount, category, type, source: 'chat' };
}

function Card({ children, color = 'bg-white', className = '' }) {
  return <View className={`${color} border-[3px] border-ink shadow-brutal rounded-none p-5 ${className}`}>{children}</View>;
}

function Button({ children, color = 'bg-ink', text = 'text-paper', onPress, className = '' }) {
  return (
    <Pressable onPress={onPress} className={`${color} border-[3px] border-ink shadow-brutalSm px-5 py-3 active:translate-x-1 active:translate-y-1 ${className}`}>
      <Text className={`${text} text-center font-black uppercase`}>{children}</Text>
    </Pressable>
  );
}

function Nav({ page, setPage }) {
  return (
    <View className="bg-paper border-b-[3px] border-ink sticky top-0 z-10">
      <View className="w-full max-w-[1180px] mx-auto px-4 py-4 flex-row items-center justify-between gap-3">
        <Pressable onPress={() => setPage('landing')} className="flex-row items-center gap-3">
          <View className="w-11 h-11 bg-banana border-[3px] border-ink shadow-brutalSm items-center justify-center"><Text className="font-black">DG</Text></View>
          <View>
            <Text className="font-black text-base tracking-tight">Duit GenZ</Text>
            <Text className="font-bold text-muted text-xs">uangmasuk vibes</Text>
          </View>
        </Pressable>
        <View className="flex-row gap-2 flex-wrap justify-end">
          {page !== 'dashboard' && <Button color="bg-white" text="text-ink" onPress={() => setPage('login')}>Login</Button>}
          <Button color="bg-mint" text="text-ink" onPress={() => setPage(page === 'dashboard' ? 'landing' : 'register')}>{page === 'dashboard' ? 'Home' : 'Register'}</Button>
        </View>
      </View>
    </View>
  );
}

function Landing({ setPage }) {
  const features = [
    ['Chat to save', 'Ketik “beli kopi 18rb” dan transaksi langsung rapi.'],
    ['Foto struk', 'Upload struk, nanti OCR bantu baca total dan item.'],
    ['Split bill', 'Patungan tanpa ribut: bagi rata atau pilih item per orang.'],
    ['Insight boncos', 'Lihat kategori yang paling sering bikin dompet nangis.'],
  ];
  return (
    <ScrollView className="bg-paper" contentContainerClassName="pb-16">
      <View className="w-full max-w-[1180px] mx-auto px-4 pt-12 gap-10">
        <View className="grid md:grid-cols-2 gap-8 items-center">
          <View>
            <View className="self-start bg-mint border-[3px] border-ink shadow-brutalSm px-4 py-2 mb-5"><Text className="font-black">FINANCE APP BUAT GEN Z</Text></View>
            <Text className="text-base md:text-5xl font-black tracking-tight leading-none text-ink">Uang masuk rapi. Uang keluar ketauan.</Text>
            <Text className="text-sm md:text-base font-bold text-muted leading-6 mt-5 max-w-[620px]">Duit GenZ bantu kamu catat pengeluaran lewat chat, foto struk, split bill, dan insight simpel. Nggak ribet, nggak kaku, nggak bikin pusing.</Text>
            <View className="flex-row gap-3 flex-wrap mt-7">
              <Button onPress={() => setPage('register')}>Mulai gratis</Button>
              <Button color="bg-white" text="text-ink" onPress={() => setPage('dashboard')}>Lihat dashboard</Button>
            </View>
          </View>
          <Card color="bg-sky" className="gap-4">
            <Text className="font-black text-base">Preview dashboard</Text>
            <View className="bg-white border-[3px] border-ink p-4">
              <Text className="font-bold text-muted">Saldo bulan ini</Text>
              <Text className="font-black text-base tracking-tight">Rp 2.480.000</Text>
            </View>
            <View className="grid grid-cols-2 gap-3">
              <View className="bg-mint border-[3px] border-ink p-4"><Text className="font-black">Masuk</Text><Text className="font-bold">Rp 4,5jt</Text></View>
              <View className="bg-bubblegum border-[3px] border-ink p-4"><Text className="font-black">Keluar</Text><Text className="font-bold">Rp 2,02jt</Text></View>
            </View>
            <View className="bg-banana border-[3px] border-ink p-4"><Text className="font-black">AI note:</Text><Text className="font-bold mt-1">“Bestie, jajan kamu naik 28%. Masih aman, tapi jangan barbar dulu.”</Text></View>
          </Card>
        </View>

        <View className="grid md:grid-cols-4 gap-4">
          {features.map(([title, desc]) => <Card key={title}><Text className="font-black text-base">{title}</Text><Text className="font-bold text-muted mt-2 leading-6">{desc}</Text></Card>)}
        </View>

        <Card color="bg-darkcard" className="md:flex-row md:items-center md:justify-between gap-5">
          <View className="flex-1">
            <Text className="text-paper font-black text-base tracking-tight">Dari catatan random jadi laporan yang niat.</Text>
            <Text className="text-[#fff8db] font-bold mt-3 leading-6">Cocok buat mahasiswa, freelancer, pasangan, atau circle nongkrong yang pengen duitnya lebih kepegang.</Text>
          </View>
          <Button color="bg-banana" text="text-ink" onPress={() => setPage('register')}>Gas daftar</Button>
        </Card>
      </View>
    </ScrollView>
  );
}

function AuthPage({ mode, setPage }) {
  const isLogin = mode === 'login';
  return (
    <ScrollView className="bg-paper" contentContainerClassName="min-h-screen px-4 py-12 items-center justify-center">
      <Card color={isLogin ? 'bg-sky' : 'bg-banana'} className="w-full max-w-[460px] gap-4">
        <Text className="font-black text-base tracking-tight">{isLogin ? 'Masuk dulu' : 'Bikin akun'}</Text>
        <Text className="font-bold text-muted leading-6">{isLogin ? 'Lanjut pantau duit kamu biar nggak misterius.' : 'Mulai catat uang dengan cara yang lebih santai.'}</Text>
        {!isLogin && <TextInput placeholder="Nama panggilan" className="bg-white border-[3px] border-ink px-4 py-3 font-bold" />}
        <TextInput placeholder="Email" keyboardType="email-address" className="bg-white border-[3px] border-ink px-4 py-3 font-bold" />
        <TextInput placeholder="Password" secureTextEntry className="bg-white border-[3px] border-ink px-4 py-3 font-bold" />
        <Button onPress={() => setPage('dashboard')}>{isLogin ? 'Login' : 'Register'}</Button>
        <Pressable onPress={() => setPage(isLogin ? 'register' : 'login')}><Text className="text-center font-black underline">{isLogin ? 'Belum punya akun? Register' : 'Udah punya akun? Login'}</Text></Pressable>
      </Card>
    </ScrollView>
  );
}

function Dashboard() {
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [chatText, setChatText] = useState('tadi beli kopi 18rb');
  const [receipt, setReceipt] = useState(null);
  const [splitTotal, setSplitTotal] = useState('156000');
  const [people, setPeople] = useState('Sae, Dya, Raka');

  const summary = useMemo(() => {
    const income = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0);
    const expense = transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0);
    return { income, expense, balance: income - expense, saveRate: income ? Math.round(((income - expense) / income) * 100) : 0 };
  }, [transactions]);

  const splitNames = people.split(',').map((name) => name.trim()).filter(Boolean);
  const splitEach = splitNames.length ? Number(splitTotal || 0) / splitNames.length : 0;

  async function addFromChat() {
    const parsed = parseChatInput(chatText);
    if (!parsed.amount) return Alert.alert('Oops', 'Nominalnya belum kebaca. Coba: beli kopi 18rb');
    setTransactions((prev) => [{ id: String(Date.now()), ...parsed }, ...prev]);
    if (isSupabaseReady) await saveTransaction(parsed);
    setChatText('');
  }

  async function pickReceipt() {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (result.canceled) return;
    setReceipt(result.assets[0].uri);
    setTransactions((prev) => [{ id: String(Date.now()), title: 'Struk baru (OCR soon)', amount: 0, category: 'makan', type: 'expense', source: 'photo' }, ...prev]);
  }

  async function saveSplit() {
    const payload = { title: 'Split bill nongkrong', total: Number(splitTotal || 0), participants: splitNames.map((name) => ({ name, amount: splitEach })), items: [], status: 'draft' };
    if (isSupabaseReady) await saveSplitBill(payload);
    Alert.alert('Split bill siap', `${splitNames.length} orang, masing-masing ${money.format(splitEach)}`);
  }

  return (
    <ScrollView className="bg-paper" contentContainerClassName="w-full max-w-[1280px] mx-auto px-4 py-8 gap-5">
      <View className="md:flex-row md:items-end md:justify-between gap-3">
        <View className="gap-2">
          <Text className="text-xl md:text-3xl font-black text-ink">DASHBOARD</Text>
          <Text className="text-muted font-black text-[10px] leading-5">SEMUA DUIT KELIHATAN. GA ADA YANG KABUR.</Text>
        </View>
        <View className="bg-mint border-[3px] border-ink shadow-brutalSm px-4 py-3"><Text className="font-black text-[10px]">SUPABASE: {isSupabaseReady ? 'ON' : 'OFF'}</Text></View>
      </View>

      <View className="grid md:grid-cols-4 gap-4">
        <Card color="bg-sky"><Text className="font-black text-[10px]">SALDO</Text><Text className="text-lg md:text-xl font-black mt-3">{money.format(summary.balance)}</Text><Text className="font-black text-[9px] text-muted mt-3">AMAN BUAT BULAN INI</Text></Card>
        <Card color="bg-mint"><Text className="font-black text-[10px]">MASUK</Text><Text className="text-lg font-black mt-3">{money.format(summary.income)}</Text><Text className="font-black text-[9px] text-muted mt-3">+12% DARI BULAN LALU</Text></Card>
        <Card color="bg-bubblegum"><Text className="font-black text-[10px]">KELUAR</Text><Text className="text-lg font-black mt-3">{money.format(summary.expense)}</Text><Text className="font-black text-[9px] text-muted mt-3">JANGAN BARBAR</Text></Card>
        <Card color="bg-banana"><Text className="font-black text-[10px]">SAVE RATE</Text><Text className="text-lg font-black mt-3">{summary.saveRate}%</Text><Text className="font-black text-[9px] text-muted mt-3">TARGET 30%</Text></Card>
      </View>

      <View className="grid lg:grid-cols-[1.3fr_.7fr] gap-4">
        <Card className="gap-4">
          <Text className="font-black text-base">CASHFLOW BULAN INI</Text>
          {['JAN','FEB','MAR','APR','MEI'].map((month, i) => (
            <View key={month} className="gap-2">
              <View className="flex-row justify-between"><Text className="font-black text-[10px]">{month}</Text><Text className="font-black text-[10px]">{money.format((i + 2) * 410000)}</Text></View>
              <View className="h-6 border-[3px] border-ink bg-paper"><View className="h-full bg-mint" style={{ width: `${42 + i * 10}%` }} /></View>
            </View>
          ))}
        </Card>
        <Card color="bg-darkcard" className="gap-4">
          <Text className="text-paper font-black text-base">AI MONEY COACH</Text>
          <Text className="text-[#fff8db] font-black text-[10px] leading-6">BESTIE, NONGKRONG UDAH 84% DARI BUDGET. KALO MAU AMAN, SISA MINGGU INI PILIH MENU HEMAT DULU.</Text>
          <Button color="bg-banana" text="text-ink">LIHAT SARAN</Button>
        </Card>
      </View>

      <View className="grid lg:grid-cols-3 gap-4">
        <Card color="bg-banana" className="gap-3"><Text className="font-black text-base">CHAT INPUT</Text><Text className="font-black text-muted text-[10px] leading-5">KETIK NATURAL. CONTOH: BELI KOPI 18RB.</Text><TextInput value={chatText} onChangeText={setChatText} placeholder="beli kopi 18rb" className="bg-white border-[3px] border-ink px-4 py-3 font-black text-[10px]" /><Button onPress={addFromChat}>SIMPAN</Button></Card>
        <Card className="gap-3"><Text className="font-black text-base">SCAN STRUK</Text><Text className="font-black text-muted text-[10px] leading-5">FOTO STRUK BUAT OCR DAN AUTO CATAT.</Text>{receipt && <Image source={{ uri: receipt }} className="h-32 border-[3px] border-ink" resizeMode="cover" />}<Button color="bg-mint" text="text-ink" onPress={pickReceipt}>PILIH FOTO</Button></Card>
        <Card color="bg-bubblegum" className="gap-3"><Text className="font-black text-base">SPLIT BILL</Text><TextInput value={splitTotal} onChangeText={setSplitTotal} keyboardType="numeric" className="bg-white border-[3px] border-ink px-4 py-3 font-black text-[10px]" /><TextInput value={people} onChangeText={setPeople} className="bg-white border-[3px] border-ink px-4 py-3 font-black text-[10px]" /><Text className="font-black text-[10px]">{money.format(splitEach)} / ORANG</Text><Button onPress={saveSplit}>BIKIN SPLIT</Button></Card>
      </View>

      <View className="grid lg:grid-cols-3 gap-4">
        <Card className="gap-3"><Text className="font-black text-base">BUDGET</Text>{budgets.map(([name, used, limit, pct]) => <View key={name} className="gap-2"><View className="flex-row justify-between"><Text className="font-black text-[10px]">{name}</Text><Text className="font-black text-[10px]">{pct}</Text></View><View className="h-5 border-[3px] border-ink bg-paper"><View className="h-full bg-banana" style={{ width: pct }} /></View><Text className="font-black text-[9px] text-muted">{money.format(used)} / {money.format(limit)}</Text></View>)}</Card>
        <Card color="bg-sky" className="gap-3"><Text className="font-black text-base">GOALS</Text>{goals.map(([name, saved, target]) => <View key={name} className="border-[3px] border-ink bg-white p-3 gap-2"><Text className="font-black text-[10px]">{name}</Text><Text className="font-black text-[9px] text-muted">{money.format(saved)} / {money.format(target)}</Text></View>)}</Card>
        <Card color="bg-mint" className="gap-3"><Text className="font-black text-base">TAGIHAN</Text>{bills.map(([name, date, amount]) => <View key={name} className="border-[3px] border-ink bg-white p-3 flex-row justify-between gap-2"><View><Text className="font-black text-[10px]">{name}</Text><Text className="font-black text-[9px] text-muted">{date}</Text></View><Text className="font-black text-[10px]">{money.format(amount)}</Text></View>)}</Card>
      </View>

      <View className="grid lg:grid-cols-[1.4fr_.6fr] gap-4">
        <Card className="gap-3"><Text className="font-black text-base">RIWAYAT</Text>{transactions.map((item) => <View key={item.id} className="border-[3px] border-ink p-4 md:flex-row md:items-center md:justify-between gap-2"><View><Text className="font-black text-[10px] leading-5">{item.title}</Text><Text className="font-black text-[9px] text-muted">#{item.category} / {item.source}</Text></View><Text className={`font-black text-[10px] ${item.type === 'income' ? 'text-green-700' : 'text-red-600'}`}>{item.type === 'income' ? '+' : '-'}{money.format(item.amount)}</Text></View>)}</Card>
        <Card color="bg-banana" className="gap-3"><Text className="font-black text-base">FITUR PRO</Text>{['EXPORT CSV/PDF','MULTI WALLET','RECURRING BILL','DEBT TRACKER','OCR RECEIPT','AI CATEGORY'].map(x => <Text key={x} className="font-black text-[10px] leading-5">▣ {x}</Text>)}</Card>
      </View>
    </ScrollView>
  );
}

export default function App() {
  const [page, setPage] = useState('landing');
  return (
    <View className="flex-1 bg-paper font-pixel">
      <StatusBar style="dark" />
      <Nav page={page} setPage={setPage} />
      {page === 'landing' && <Landing setPage={setPage} />}
      {page === 'login' && <AuthPage mode="login" setPage={setPage} />}
      {page === 'register' && <AuthPage mode="register" setPage={setPage} />}
      {page === 'dashboard' && <Dashboard />}
    </View>
  );
}
