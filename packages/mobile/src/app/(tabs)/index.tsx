import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS, SPACING, BORDER_RADIUS } from "@/constants/theme";

const stats = [
  { title: "Total Value", value: "$124,500", icon: "trending-up" as const, color: COLORS.success },
  { title: "Assets", value: "12", icon: "gem" as const, color: COLORS.gold[500] },
  { title: "Nominees", value: "3", icon: "people" as const, color: COLORS.violet[500] },
  { title: "Wills", value: "2", icon: "document-text" as const, color: "#3B82F6" },
];

const quickActions = [
  { title: "Add Asset", icon: "add-circle" as const, route: "/assets" as const },
  { title: "Add Nominee", icon: "person-add" as const, route: "/nominees" as const },
  { title: "Create Will", icon: "create" as const, route: "/wills" as const },
  { title: "Check In", icon: "finger-print" as const, route: "/more" as const },
];

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[COLORS.gold[500] + "10", "transparent"]}
        style={styles.gradient}
      >
        <Text style={styles.greeting}>Welcome back 👋</Text>
        <Text style={styles.subtitle}>Your digital legacy overview</Text>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <View key={stat.title} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + "20" }]}>
              <Ionicons name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </View>
        ))}
      </View>

      {/* Pulse Status */}
      <View style={styles.card}>
        <View style={styles.pulseHeader}>
          <Ionicons name="time" size={24} color={COLORS.gold[500]} />
          <Text style={styles.cardTitle}>Pulse Status</Text>
        </View>
        <View style={styles.pulseContent}>
          <View style={styles.pulseRing}>
            <Text style={styles.pulseDays}>45</Text>
            <Text style={styles.pulseLabel}>days</Text>
          </View>
          <Text style={styles.pulseSubtext}>Remaining until claim eligible</Text>
        </View>
        <TouchableOpacity style={styles.goldButton}>
          <Text style={styles.goldButtonText}>Check In Now</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.title}
              style={styles.actionCard}
              onPress={() => router.push(action.route)}
            >
              <Ionicons name={action.icon} size={28} color={COLORS.gold[500]} />
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {[
          { title: "Asset Added", desc: "Added 2.45 ETH", time: "2h ago" },
          { title: "Nominee Added", desc: "Added Alice Johnson", time: "1d ago" },
          { title: "Will Created", desc: "Family Legacy Will", time: "3d ago" },
        ].map((activity, i) => (
          <View key={i} style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDesc}>{activity.desc}</Text>
            </View>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradient: {
    padding: SPACING.lg,
    paddingTop: SPACING.md,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.foreground,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.muted,
    marginTop: SPACING.xs,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  statCard: {
    width: "48%",
    backgroundColor: COLORS.navy[800],
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.navy[700],
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.foreground,
  },
  statTitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: SPACING.xs,
  },
  card: {
    margin: SPACING.md,
    backgroundColor: COLORS.navy[800],
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.navy[700],
  },
  pulseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.foreground,
  },
  pulseContent: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  pulseRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: COLORS.gold[500],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  pulseDays: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.foreground,
  },
  pulseLabel: {
    fontSize: 14,
    color: COLORS.muted,
  },
  pulseSubtext: {
    fontSize: 14,
    color: COLORS.muted,
  },
  goldButton: {
    backgroundColor: COLORS.gold[500],
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  goldButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.navy[900],
  },
  section: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.foreground,
    marginBottom: SPACING.md,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  actionCard: {
    width: "48%",
    backgroundColor: COLORS.navy[800],
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.navy[700],
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.foreground,
    marginTop: SPACING.sm,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.navy[700],
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gold[500],
    marginRight: SPACING.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.foreground,
  },
  activityDesc: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: COLORS.muted,
  },
});
