import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS } from "@/constants/theme";

const wills = [
  {
    id: "1",
    title: "Family Legacy Will",
    status: "ACTIVE",
    assets: 5,
    nominees: 3,
    value: "$124,500",
  },
  {
    id: "2",
    title: "Emergency Access",
    status: "DRAFT",
    assets: 2,
    nominees: 1,
    value: "$45,000",
  },
];

export default function WillsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>My Wills</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={COLORS.navy[900]} />
          <Text style={styles.addButtonText}>Create Will</Text>
        </TouchableOpacity>
      </View>

      {wills.map((will) => (
        <TouchableOpacity key={will.id} style={styles.willCard}>
          <View style={styles.willHeader}>
            <Text style={styles.willTitle}>{will.title}</Text>
            <View style={[styles.statusBadge, will.status === "ACTIVE" ? styles.statusActive : styles.statusDraft]}>
              <Text style={[styles.statusText, will.status === "ACTIVE" ? styles.statusTextActive : styles.statusTextDraft]}>
                {will.status}
              </Text>
            </View>
          </View>

          <View style={styles.willStats}>
            <View style={styles.willStat}>
              <Ionicons name="gem" size={16} color={COLORS.muted} />
              <Text style={styles.willStatText}>{will.assets} assets</Text>
            </View>
            <View style={styles.willStat}>
              <Ionicons name="people" size={16} color={COLORS.muted} />
              <Text style={styles.willStatText}>{will.nominees} nominees</Text>
            </View>
            <View style={styles.willStat}>
              <Ionicons name="cash" size={16} color={COLORS.muted} />
              <Text style={styles.willStatText}>{will.value}</Text>
            </View>
          </View>

          <View style={styles.willFooter}>
            <Text style={styles.willDate}>Created: Jan 15, 2025</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.foreground,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gold[500],
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.xs,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.navy[900],
  },
  willCard: {
    backgroundColor: COLORS.navy[800],
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.navy[700],
  },
  willHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  willTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.foreground,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  statusActive: {
    backgroundColor: COLORS.success + "20",
  },
  statusDraft: {
    backgroundColor: COLORS.warning + "20",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusTextActive: {
    color: COLORS.success,
  },
  statusTextDraft: {
    color: COLORS.warning,
  },
  willStats: {
    flexDirection: "row",
    gap: SPACING.lg,
    marginBottom: SPACING.md,
  },
  willStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  willStatText: {
    fontSize: 14,
    color: COLORS.muted,
  },
  willFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.navy[700],
  },
  willDate: {
    fontSize: 12,
    color: COLORS.muted,
  },
});
