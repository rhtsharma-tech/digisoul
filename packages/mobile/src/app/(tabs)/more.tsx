import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS, SPACING, BORDER_RADIUS } from "@/constants/theme";

const menuItems = [
  { icon: "time" as const, title: "Pulse", route: "/more" as const, subtitle: "45 days remaining" },
  { icon: "activity" as const, title: "Activity", route: "/more" as const, subtitle: "View all transactions" },
  { icon: "settings" as const, title: "Settings", route: "/more" as const, subtitle: "Account & preferences" },
  { icon: "shield-checkmark" as const, title: "Security", route: "/more" as const, subtitle: "Protect your vault" },
  { icon: "help-circle" as const, title: "Help & Support", route: "/more" as const, subtitle: "Get assistance" },
  { icon: "information-circle" as const, title: "About", route: "/more" as const, subtitle: "DigiSoul v1.0.0" },
];

export default function MoreScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>More</Text>

      {/* Pulse Quick View */}
      <View style={styles.pulseCard}>
        <View style={styles.pulseHeader}>
          <Ionicons name="time" size={24} color={COLORS.gold[500]} />
          <Text style={styles.pulseTitle}>Pulse Status</Text>
        </View>
        <View style={styles.pulseContent}>
          <Text style={styles.pulseDays}>45</Text>
          <Text style={styles.pulseLabel}>days remaining</Text>
        </View>
        <TouchableOpacity style={styles.pulseButton}>
          <Ionicons name="finger-print" size={20} color={COLORS.navy[900]} />
          <Text style={styles.pulseButtonText}>Check In Now</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.title}
            style={[styles.menuItem, index === menuItems.length - 1 && styles.menuItemLast]}
            onPress={() => router.push(item.route)}
          >
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon} size={24} color={COLORS.gold[500]} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Wallet Info */}
      <View style={styles.walletCard}>
        <View style={styles.walletHeader}>
          <Ionicons name="wallet" size={24} color={COLORS.gold[500]} />
          <Text style={styles.walletTitle}>Connected Wallet</Text>
        </View>
        <Text style={styles.walletAddress}>0x1234...5678</Text>
        <Text style={styles.walletNetwork}>Network: Polygon Amoy</Text>
        <TouchableOpacity style={styles.disconnectButton}>
          <Text style={styles.disconnectText}>Disconnect</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.foreground,
    marginBottom: SPACING.lg,
  },
  pulseCard: {
    backgroundColor: COLORS.navy[800],
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.navy[700],
  },
  pulseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  pulseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.foreground,
  },
  pulseContent: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  pulseDays: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.gold[500],
  },
  pulseLabel: {
    fontSize: 16,
    color: COLORS.muted,
  },
  pulseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gold[500],
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  pulseButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.navy[900],
  },
  menuSection: {
    backgroundColor: COLORS.navy[800],
    borderRadius: BORDER_RADIUS.lg,
    overflow: "hidden",
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.navy[700],
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.navy[700],
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.gold[500] + "10",
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.foreground,
  },
  menuSubtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 2,
  },
  walletCard: {
    backgroundColor: COLORS.navy[800],
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.navy[700],
  },
  walletHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.foreground,
  },
  walletAddress: {
    fontSize: 16,
    fontFamily: "monospace",
    color: COLORS.foreground,
    marginBottom: SPACING.xs,
  },
  walletNetwork: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: SPACING.md,
  },
  disconnectButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.danger,
    alignItems: "center",
  },
  disconnectText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.danger,
  },
});
