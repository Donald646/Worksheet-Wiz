import { React } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

export const MyDocument = ({ response, info }) => {
  const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#E4E4E4",
    },
    questions: {
      margin: 5,
      padding: 10,
      lineHeight: "1.5pt",
      fontSize: 10,
    },
    h1: {
      marginTop: 5,
      fontSize: 20,
      textAlign: "center",
    },
  });
  console.log(info);
  return (
    <Document title={info?.topic === "" ? "Worksheet" : info?.topic}>
      <Page style={styles.page}>
        <Text style={styles.h1}>{info?.topic}</Text>
        <View style={styles.questionContainer}>
          {response.map((question, index) => (
            <Text wrap={false} style={styles.questions} key={index}>{`${
              index + 1
            }. ${question}`}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};
