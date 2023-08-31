import { Text } from "@geist-ui/core";
function HomePage() {
  return (
    <Text b i style={{ letterSpacing: "0.6px" }} font="50px">
      <Text span style={{ color: "#40E0D0" }}>
        W
      </Text>
      <Text span type="warning">
        e
      </Text>
      <Text span style={{ color: "#FF69B4" }}>
        l
      </Text>
      <Text span type="error">
        c
      </Text>
      <Text span style={{ color: "#ccc" }}>
        o
      </Text>
      <Text span style={{ color: "#9370DB" }}>
        m
      </Text>
    </Text>
  );
}

export default HomePage;
