import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const features = [
  { icon: "🕌", title: "Время намаза", subtitle: "Расписание на сегодня", color: "#818CF8" },
  { icon: "🧭", title: "Кибла", subtitle: "Направление на Каабу", color: "#34D399" },
  { icon: "🤲", title: "Азкары и Коран", subtitle: "Поминания и чтение", color: "#FBBF24" },
  { icon: "📿", title: "Трекер намазов", subtitle: "Отмечайте выполненные молитвы", color: "#F87171" },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.logo}><Text style={styles.logoText}>S</Text></View>
          <View style={styles.brand}>
            <Text style={styles.brandName}>Seynaro</Text>
            <Text style={styles.brandCaption}>ДУХОВНАЯ ПРАКТИКА КАЖДЫЙ ДЕНЬ</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>МИР И СПОКОЙСТВИЕ</Text>
          <Text style={styles.heading}>Ваш путь к регулярной молитве</Text>
          <Text style={styles.description}>
            Время намаза, направление киблы и полезные инструменты для ежедневной практики — в одном приложении.
          </Text>
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Мобильная версия создаётся</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Возможности Seynaro</Text>
        <View style={styles.grid}>
          {features.map((item) => (
            <View key={item.title} style={styles.card}>
              <View style={[styles.iconBox, { borderColor: item.color + "55", backgroundColor: item.color + "18" }]}>
                <Text style={styles.featureIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
          ))}
        </View>

        <View style={styles.note}>
          <Text style={styles.noteTitle}>Следующий этап</Text>
          <Text style={styles.noteText}>
            Подключим реальные расчёты времени намаза, сохранение настроек, компас и уведомления. Пока эта сборка — стартовый интерфейс, а не готовое приложение.
          </Text>
        </View>
        <Text style={styles.footer}>SEYNARO · ANDROID FIRST</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0A0F1F" },
  content: { padding: 20, paddingBottom: 36, maxWidth: 720, width: "100%", alignSelf: "center" },
  topRow: { flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 28, gap: 12 },
  logo: { width: 48, height: 48, borderRadius: 16, backgroundColor: "#6366F1", alignItems: "center", justifyContent: "center" },
  logoText: { color: "#FFFFFF", fontSize: 27, fontWeight: "800" },
  brand: { flex: 1 },
  brandName: { color: "#F8FAFC", fontSize: 22, fontWeight: "800", letterSpacing: 0.3 },
  brandCaption: { color: "#94A3B8", fontSize: 9, fontWeight: "700", letterSpacing: 1.4, marginTop: 3 },
  hero: { borderRadius: 28, padding: 22, backgroundColor: "#131C32", borderWidth: 1, borderColor: "#26334D", marginBottom: 26 },
  eyebrow: { color: "#A5B4FC", fontSize: 10, fontWeight: "800", letterSpacing: 1.5, marginBottom: 12 },
  heading: { color: "#FFFFFF", fontSize: 30, lineHeight: 36, fontWeight: "800", marginBottom: 12 },
  description: { color: "#B6C2D7", fontSize: 14, lineHeight: 22 },
  statusPill: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", gap: 8, marginTop: 18, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 99, backgroundColor: "#1E293B" },
  statusDot: { width: 7, height: 7, borderRadius: 5, backgroundColor: "#34D399" },
  statusText: { color: "#D1FAE5", fontSize: 11, fontWeight: "700" },
  sectionTitle: { color: "#F8FAFC", fontSize: 19, fontWeight: "800", marginBottom: 14 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: { width: "48%", flexGrow: 1, minHeight: 150, padding: 16, borderRadius: 22, backgroundColor: "#111A2D", borderWidth: 1, borderColor: "#25314A" },
  iconBox: { width: 42, height: 42, borderRadius: 14, borderWidth: 1, alignItems: "center", justifyContent: "center", marginBottom: 14 },
  featureIcon: { fontSize: 22 },
  cardTitle: { color: "#F8FAFC", fontSize: 14, fontWeight: "800", marginBottom: 6 },
  cardSubtitle: { color: "#94A3B8", fontSize: 12, lineHeight: 18 },
  note: { marginTop: 20, padding: 18, borderRadius: 20, backgroundColor: "#10192B", borderWidth: 1, borderColor: "#293650" },
  noteTitle: { color: "#C7D2FE", fontSize: 14, fontWeight: "800", marginBottom: 8 },
  noteText: { color: "#A8B4C9", fontSize: 13, lineHeight: 20 },
  footer: { color: "#526079", fontSize: 9, fontWeight: "800", letterSpacing: 2, textAlign: "center", marginTop: 28 },
});
