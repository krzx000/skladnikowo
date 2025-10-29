"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { AnalysisResultData } from "@/lib/types";

// Register fonts with Polish characters support
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 700,
    },
  ],
});

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#f8f7f5",
    fontFamily: "Roboto",
  },
  header: {
    backgroundColor: "#f9c09a",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: 5,
  },
  headerProducent: {
    fontSize: 16,
    fontWeight: 400,
    color: "#ffffff",
    opacity: 0.95,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  score: {
    fontSize: 48,
    fontWeight: 700,
    color: "#ffffff",
  },
  scoreLabel: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.95,
  },
  section: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#50304d",
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#50304d",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: 400,
    color: "#50304d",
  },
  value: {
    fontSize: 12,
    fontWeight: 700,
    color: "#50304d",
  },
  ratingCard: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    border: "1px solid #e5e5e5",
  },
  ratingTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#50304d",
    marginBottom: 3,
  },
  ratingScore: {
    fontSize: 20,
    fontWeight: 700,
    color: "#50304d",
    marginBottom: 5,
  },
  ratingDescription: {
    fontSize: 10,
    fontWeight: 400,
    color: "#666",
  },
  listItem: {
    fontSize: 11,
    fontWeight: 400,
    color: "#50304d",
    marginBottom: 3,
  },
  badge: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 8,
    marginBottom: 5,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 400,
    color: "#50304d",
  },
  finalSection: {
    backgroundColor: "#ff8737",
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  finalTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: 15,
  },
  finalSubtitle: {
    fontSize: 12,
    fontWeight: 400,
    color: "#ffffff",
    opacity: 0.95,
    marginBottom: 10,
  },
  advantagesList: {
    marginBottom: 10,
  },
  listItemWhite: {
    fontSize: 11,
    fontWeight: 400,
    color: "#ffffff",
    marginBottom: 3,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
    fontWeight: 400,
    color: "#666",
  },
});

const capitalizeFirst = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const AnalysisResultPDF = ({
  result,
}: {
  result: AnalysisResultData;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {result.name || "Nazwa nieznana"}
        </Text>
        <Text style={styles.headerProducent}>
          {result.producent || "Producent nieznany"}
        </Text>
        <View style={styles.scoreContainer}>
          <View>
            <Text style={styles.scoreLabel}>Gatunek: {result.species}</Text>
            <Text style={styles.scoreLabel}>Rodzaj: {result.type}</Text>
          </View>
          <View>
            <Text style={styles.score}>{result.rate.score_0_100}/100</Text>
            <Text style={styles.scoreLabel}>Ogólna ocena</Text>
          </View>
        </View>
      </View>

      {/* Rating Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Szczegółowe Oceny</Text>
        <View style={styles.ratingCard}>
          <Text style={styles.ratingTitle}>Jakość mięsa</Text>
          <Text style={styles.ratingScore}>
            {result.rate.meat_quality.rate}/5
          </Text>
          <Text style={styles.ratingDescription}>
            {result.rate.meat_quality.description}
          </Text>
        </View>
        <View style={styles.ratingCard}>
          <Text style={styles.ratingTitle}>Zawartość Białka</Text>
          <Text style={styles.ratingScore}>
            {result.rate.protein_content.rate}/5
          </Text>
          <Text style={styles.ratingDescription}>
            {result.rate.protein_content.description}
          </Text>
        </View>
        <View style={styles.ratingCard}>
          <Text style={styles.ratingTitle}>Bilans Tłuszczów</Text>
          <Text style={styles.ratingScore}>
            {result.rate.fat_content.rate}/5
          </Text>
          <Text style={styles.ratingDescription}>
            {result.rate.fat_content.description}
          </Text>
        </View>
      </View>

      {/* Composition */}
      {result.composition.meal_and_offal &&
        result.composition.meal_and_offal.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skład - Mięso i Podroby</Text>
            {result.composition.meal_and_offal.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.label}>{capitalizeFirst(item.name)}</Text>
                <Text style={styles.value}>
                  {item.percentage ? `${item.percentage}%` : "N/A"}
                </Text>
              </View>
            ))}
          </View>
        )}

      {/* Analytical Components */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profil Odżywczy</Text>
        {result.analytical_components.protein && (
          <View style={styles.row}>
            <Text style={styles.label}>Białko Surowe</Text>
            <Text style={styles.value}>
              {result.analytical_components.protein.value}
              {result.analytical_components.protein.unit}
            </Text>
          </View>
        )}
        {result.analytical_components.fat && (
          <View style={styles.row}>
            <Text style={styles.label}>Tłuszcz Surowy</Text>
            <Text style={styles.value}>
              {result.analytical_components.fat.value}
              {result.analytical_components.fat.unit}
            </Text>
          </View>
        )}
        {result.analytical_components.carbohydrates && (
          <View style={styles.row}>
            <Text style={styles.label}>Węglowodany</Text>
            <Text style={styles.value}>
              {result.analytical_components.carbohydrates.value}
              {result.analytical_components.carbohydrates.unit}
            </Text>
          </View>
        )}
        {result.analytical_components.fiber && (
          <View style={styles.row}>
            <Text style={styles.label}>Włókno Surowe</Text>
            <Text style={styles.value}>
              {result.analytical_components.fiber.value}
              {result.analytical_components.fiber.unit}
            </Text>
          </View>
        )}
      </View>
      {/* Vitamins and Minerals */}
      {result.vitamins && result.vitamins.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Witaminy</Text>
          {result.vitamins.map((vitamin, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.label}>{capitalizeFirst(vitamin.name)}</Text>
              <Text style={styles.value}>
                {vitamin.value} {vitamin.unit}
              </Text>
            </View>
          ))}
        </View>
      )}

      {result.minerals && result.minerals.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minerały</Text>
          {result.minerals.map((mineral, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.label}>{capitalizeFirst(mineral.name)}</Text>
              <Text style={styles.value}>
                {mineral.value} {mineral.unit}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Allergens */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alergeny</Text>
        {result.allergens.detected && result.allergens.detected.length > 0 ? (
          <>
            <Text style={styles.sectionSubtitle}>Wykryte Alergeny:</Text>
            {result.allergens.detected.map((allergen, index) => (
              <Text key={index} style={styles.listItem}>
                • {capitalizeFirst(allergen)}
              </Text>
            ))}
          </>
        ) : (
          <Text style={styles.label}>Brak wykrytych alergenów</Text>
        )}
        {result.allergens.gluten_free && (
          <Text style={styles.listItem}>✓ Bezglutenowe</Text>
        )}
        {result.allergens.lactose_free && (
          <Text style={styles.listItem}>✓ Bez laktozy</Text>
        )}
      </View>

      {/* Final Rating */}
      <View style={styles.finalSection}>
        <Text style={styles.finalTitle}>
          Finalna Ocena: {result.rate.score_0_100}/100
        </Text>
        <Text style={styles.finalSubtitle}>
          {result.verdict.final_rating
            ? capitalizeFirst(result.verdict.final_rating)
            : ""}
        </Text>

        {result.verdict.advantages && result.verdict.advantages.length > 0 && (
          <View style={styles.advantagesList}>
            <Text style={styles.finalSubtitle}>Zalety:</Text>
            {result.verdict.advantages.map((advantage, index) => (
              <Text key={index} style={styles.listItemWhite}>
                ✓ {advantage}
              </Text>
            ))}
          </View>
        )}

        {result.verdict.disadvantages &&
          result.verdict.disadvantages.length > 0 && (
            <View style={styles.advantagesList}>
              <Text style={styles.finalSubtitle}>Wady:</Text>
              {result.verdict.disadvantages.map((disadvantage, index) => (
                <Text key={index} style={styles.listItemWhite}>
                  ✗ {disadvantage}
                </Text>
              ))}
            </View>
          )}

        {result.rate.comment && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.finalSubtitle}>Rekomendacja:</Text>
            <Text style={styles.listItemWhite}>{result.rate.comment}</Text>
          </View>
        )}
      </View>

      <Text style={styles.footer}>
        Analiza wygenerowana przez Składnikowo.pl •{" "}
        {new Date().toLocaleDateString("pl-PL")}
      </Text>
    </Page>
  </Document>
);
