import { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Animated,
  ActivityIndicator,
} from "react-native"
import { useAuth } from "../contexts/AuthContext"

const SignInScreen = () => {
  const { signIn, isLoading } = useAuth()
  const [isButtonActive, setIsButtonActive] = useState(false)
  const buttonScale = useState(new Animated.Value(1))[0]

  const handlePressIn = () => {
    Animated.timing(buttonScale, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.timing(buttonScale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }

  const handleSignIn = async () => {
    try {
      await signIn()
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <ImageBackground
      source={require("../assets/images/signin.png")}
      style={styles.backgroundImage}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.overlay}>
            <View style={styles.content}>
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoText}>HP</Text>
                </View>
                <Text style={styles.appName}>HealthPal</Text>
              </View>

              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.subtitle}>Sign in to continue</Text>

              <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}>
                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={handleSignIn}
                  disabled={isLoading}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#3b5998" />
                  ) : (
                    <Text style={styles.signInButtonText}>
                      Sign In with Auth0
                    </Text>
                  )}
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#3b5998",
  },
  appName: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
  signInButton: {
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
  },
  signInButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3b5998",
  },
})

export default SignInScreen 