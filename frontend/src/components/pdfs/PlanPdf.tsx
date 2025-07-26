import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import type { PlanCarrera } from "@/models";
import { capitalizeWords } from "@/utils";

interface PlanPdfProps {
  plan?: PlanCarrera;
  totalCredits: number;
}

export const PlanPdf = ({ plan, totalCredits }: PlanPdfProps) => {
  if (!plan?.length) return null;

  const beginDateText = plan[0].label;
  const endDateText = plan[plan.length - 1].label;
  const totalSemesters = plan.length;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.title}>Plan de carrera</Text>
            <Image src="/images/logo-black.png" style={styles.img} />
          </View>

          <View style={styles.list}>
            <View style={styles.row}>
              <Text style={styles.textBold}>Carrera:</Text>
              <Text style={styles.text}>Ingeniería en computación</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.textBold}>Próxima fecha de inicio:</Text>
              <Text style={styles.text}>{beginDateText}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.textBold}>Fecha de finalización:</Text>
              <Text style={styles.text}>{endDateText}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.textBold}>
                Cantidad de semestres restantes:
              </Text>
              <Text style={styles.text}>{totalSemesters}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.textBold}>Créditos totales:</Text>
              <Text style={styles.text}>{totalCredits}</Text>
            </View>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.grid}>
          {plan.map(({ semestre, unidadesCurriculares, creditos, label }) => (
            <View key={semestre} style={styles.gridItem}>
              <Text style={styles.heading}>
                {label} ({creditos} créditos)
              </Text>

              <View style={styles.list}>
                {unidadesCurriculares.map((uc) => (
                  <View
                    key={uc.codigo}
                    style={[styles.row, { justifyContent: "space-between" }]}
                  >
                    <Text style={styles.text}>
                      {capitalizeWords(uc.nombre)}
                    </Text>
                    <Text style={[styles.textBold, { color: "#004A87" }]}>
                      {uc.creditos}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 32,
  },
  section: {
    gap: 12,
  },
  img: {
    width: 115,
    aspectRatio: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  list: {
    gap: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 24,
  },
  gridItem: {
    width: "47%",
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  separator: {
    marginVertical: 28,
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b3b3b",
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3b3b3b",
  },
  text: {
    fontSize: 11,
    fontWeight: "normal",
    color: "#7d7d7d",
  },
  textBold: {
    fontSize: 11,
    fontWeight: "semibold",
    color: "#494949",
  },
});
