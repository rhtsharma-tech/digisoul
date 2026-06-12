import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS } from "@/constants/theme";

const nominees = [
  {
    id: "1",
    name: "Alice Johnson",
    relationship: "Daughter",
    percentage: 60,
    address: "0x1234...5678",
  },
  {
    id: "2",
    name: "Bob Smith",
    relationship: "Son",
    percentage: 30,
    address: "0xABCD...EFGH",
  },
  {
    id: "3",
    name: "Carol Williams",
    relationship: "Sister",
    percentage: 10,
    address: "0x9876...5432",
  },
];

export default function NomineesScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>My Nominees</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={COLORS.navy[900]} />
          <Text style={styles.addButtonText}>Add Nominee</Text>
        </TouchableOpacity>
      </View>

      {/* Allocation Bar */}
      <View style={styles.allocationCard}>
        <Text style={styles.allocationTitle}>Allocation Summary</Text>
        <View style={styles.allocationBar}>
          <View style={[styles.allocationSegment, { width: "60%", backgroundColor: COLORS.gold[500] }]} />
          <View style={[styles.allocationSegment, { width: "30%", backgroundColor: COLORS.violet[500] }]} />
          <View style={[styles.allocationSegment, { width: "10%", backgroundColor: COLORS.success }]} />
        </View>
        <View style={styles.allocationLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.gold[500] }]} />
            <Text style={styles.legendText}>Alice: 60%</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.violet[500] }]} />
            <Text style={styles.legendText}>Bob: 30%</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.success }]} />
            <Text style={styles.legendText}>Carol: 10%</Text>
          </View>
        </View>
        <Text style={styles.allocationTotal}>Total: 100% allocated</Text>
      </View>

      {/* Nominee List */}
      {nominees.map((nominee) => (
        <TouchableOpacity key={nominee.id} style={styles.nomineeCard}>
          <View style={styles.nomineeAvatar}>
            <Text style={styles.nomineeInitial}>{nominee.name[0]}</Text>
          </View>
          <View style={styles.nomineeInfo}>
            <Text style={styles.nomineeName}>{nominee.name}</Text>
            <Text style={styles.nomineeRelation}>{nominee.relationship}</Text>
            <Text style={styles.nomineeAddress}>{nominee.address}</Text>
          </View>
          <View style={styles.nomineePercentage}>
            <Text style={styles.percentageText}>{nominee.percentage}%</Text>
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
  allocationCard: {
    backgroundColor: COLORS.navy[800],
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.navy[700],
  },
  allocationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.foreground,
    marginBottom: SPACING.md,
  },
  allocationBar: {
    flexDirection: "row",
    height: 12,
    borderRadius: BORDER_RADIUS.full,
    overflow: "hidden",
    marginBottom: SPACING.md,
  },
  allocationSegment: {
    height: "100%",
  },
  allocationLegend: {
    flexDirection: "row",
    gap: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.muted,
  },
  allocationTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.foreground,
  },
  nomineeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.navy[800],
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.navy[700],
  },
  nomineeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gold[500] + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  nomineeInitial: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.gold[500],
  },
  nomineeInfo: {
    flex: 1,
  },
  nomineeName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.foreground,
  },
  nomineeRelation: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 2,
  },
  nomineeAddress: {
    fontSize: 12,
    color: COLORS.muted,
    fontFamily: "monospace",
    marginTop: 2,
  },
  nomineePercentage: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gold[500],
  },
});
