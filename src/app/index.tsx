import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

function useStopwatch(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  return seconds;
}

function PracticeTracker({
  solved,
  onSolve,
  onReset,
}: {
  solved: number;
  onSolve: () => void;
  onReset: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Practice Tracker</Text>
      <Text style={styles.counter}>Solved: {solved}</Text>

      <Button title="Solve +1" onPress={onSolve} />

      <View style={styles.space} />

      <Button title="Reset" onPress={onReset} />

      {solved >= 5 && <Text style={styles.success}>Great job!</Text>}
    </View>
  );
}

function Stopwatch({
  seconds,
  isRunning,
}: {
  seconds: number;
  isRunning: boolean;
}) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const time =
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0");

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Lab Stopwatch</Text>
      <Text style={styles.timer}>{time}</Text>

      <Text style={styles.status}>{isRunning ? "Running..." : "Paused"}</Text>
    </View>
  );
}

export default function LabScreen() {
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const seconds = useStopwatch(isRunning);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lab Practice Tracker</Text>

      <PracticeTracker
        solved={solved}
        onSolve={() => setSolved((s) => s + 1)}
        onReset={() => setSolved(0)}
      />

      <Stopwatch seconds={seconds} isRunning={isRunning} />

      <View style={styles.space} />

      <Button title="Start" onPress={() => setIsRunning(true)} />

      <View style={styles.space} />

      <Button title="Stop" onPress={() => setIsRunning(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  counter: {
    fontSize: 22,
    marginBottom: 15,
  },
  timer: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  status: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 5,
  },
  success: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginTop: 15,
  },
  space: {
    height: 10,
  },
});
