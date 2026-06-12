import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS, SPACING, BORDER_RADIUS } from "@/constants/theme";

const assets = [
  { id: "1", type: "token", name: "ETH", amount: "2.45 ETH", value: "$8,234.50", icon: "logo-ethereum" },
  { id: "2", type: "token", name: "USDC", amount: "5,000 USDC", value: "$5,000.00", icon: "cash" },
  { id: "3", type: "nft", name: "BAYC #1234", amount: "1 NFT", value: "$12,500", icon: "image" },
  { id: "4", type: "nft", name: "Azuki #567", amount: "1 NFT", value: "$3,200", icon: "image" },
  { id: "5", type: "document", name: "Last Will 2025.pdf", amount: "2.4 MB", value: "IPFS", icon: "document" },
];

export default function AssetsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>My Assets</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={COLORS.navy[900]} />
          <Text style={styles.addButtonText}>Add Asset</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filters}>
        {["All", "Tokens", "NFTs", "Documents"].map((filter, i) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterTab, i === 0 && styles.filterTabActive]}
          >
            <Text style={[styles.filterText, i === 0 && styles.filterTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Asset List */}
      {assets.map((asset) => (
        <TouchableOpacity key={asset.id} style={styles.assetCard}>
          <View style={[styles.assetIcon, asset.type === "token" && styles.tokenIcon, asset.type === "nft" && styles.nftIcon, asset.type === "document" && styles.docIcon]}>
            <Ionicons name={asset.icon as any} size={24} color={COLORS.gold[500]} />
          </View>
          <View style={styles.assetInfo}>
            <Text style={styles.assetName}>{asset.name}</Text>
            <Text style={styles.assetAmount}>{asset.amount}</Text>
          </View>
          <View style={styles.assetValue}>
            <Text style={styles.assetValueText}>{asset.value}</Text>
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
  filters: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  filterTab: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.navy[800],
    borderWidth: 1,
    borderColor: COLORS.navy[700],
  },
  filterTabActive: {
    backgroundColor: COLORS.gold[500] + "20",
    borderColor: COLORS.gold[500],
  },
  filterText: {
    fontSize: 14,
    color: COLORS.muted,
  },
  filterTextActive: {
    color: COLORS.gold[500],
  },
  assetCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.navy[800],
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.navy[700],
  },
  assetIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.gold[500] + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  tokenIcon: {
    backgroundColor: "#3B82F620",
  },
  nftIcon: {
    backgroundColor: COLORS.violet[500] + "20",
  },
  docIcon: {
    backgroundColor: COLORS.success + "20",
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.foreground,
  },
  assetAmount: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 2,
  },
  assetValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  assetValueText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.foreground,
  },
});
