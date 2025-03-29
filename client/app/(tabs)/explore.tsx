import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Image, ActivityIndicator } from "react-native";
import axios from "axios";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// wallet address from .env
const WALLET_ADDRESS = "0x76a57aAE6077d6631B38499cb01Bb4121a212050";

type NFT = {
  id: string;
  name: string;
  description?: string;
  image?: string;
};

export default function TabTwoScreen() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);

        // make API call to backend to fetch NFTs (dummy for now)
        const response = await axios.get(`/api/nfts?wallet=${WALLET_ADDRESS}`);

        setNfts(response.data);
      } catch (err) {
        console.error("Error fetching NFTs:", err);
        setError("Failed to load NFTs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const renderNFTItem = ({ item }: { item: NFT }) => (
    <ThemedView style={styles.nftCard}>
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={styles.nftImage}
          resizeMode="cover"
        />
      ) : (
        <ThemedView style={styles.placeholderImage}>
          <ThemedText>No Image</ThemedText>
        </ThemedView>
      )}
      <ThemedView style={styles.nftInfo}>
        <ThemedText type="defaultSemiBold">
          {item.name || "Unnamed NFT"}
        </ThemedText>
        {item.description && (
          <ThemedText numberOfLines={2}>{item.description}</ThemedText>
        )}
      </ThemedView>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        My NFT Collection
      </ThemedText>
      <ThemedText style={styles.walletAddress}>
        Wallet: {WALLET_ADDRESS}
      </ThemedText>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      ) : nfts.length === 0 ? (
        <ThemedText style={styles.emptyText}>
          No NFTs found in this wallet
        </ThemedText>
      ) : (
        <FlatList
          data={nfts}
          renderItem={renderNFTItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  walletAddress: {
    marginBottom: 16,
    fontSize: 12,
  },
  list: {
    gap: 16,
  },
  nftCard: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  nftImage: {
    width: "100%",
    height: 200,
  },
  placeholderImage: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  nftInfo: {
    padding: 12,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
});
