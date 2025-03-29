import { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Animated,
  ActivityIndicator,
  ViewStyle,
  SafeAreaView,
} from "react-native"
import { useAuth } from "../contexts/AuthContext"

// Using any for style props to avoid complex type errors with style arrays
interface FloatingElementProps {
  style?: any;
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}

// Animated cloud component
const FloatingElement = ({ style, duration = 8000, children, delay = 0 }: FloatingElementProps) => {
  const position = useState(new Animated.Value(0))[0]

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(position, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [])

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [
            {
              translateY: position.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -15],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  )
}

// Add this below the FloatingElement component
const FloatingRotateElement = ({ style, children, duration = 10000, delay = 0 }: FloatingElementProps) => {
  const rotation = useState(new Animated.Value(0))[0]

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(rotation, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        })
      ])
    ).start()
  }, [])

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [
            {
              rotate: rotation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  )
}

const SignInScreen = () => {
  const { signIn, isLoading } = useAuth()
  const buttonScale = useState(new Animated.Value(1))[0]
  const cardScale = useState(new Animated.Value(0.9))[0]

  // Animate card appearance
  useEffect(() => {
    Animated.spring(cardScale, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true
    }).start()
  }, [])

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
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <View style={styles.overlay}>
              <View style={styles.content}>
                <Animated.View 
                  style={[
                    styles.dialogCard,
                    { transform: [{ scale: cardScale }] }
                  ]}
                >
                  <Text style={styles.welcomeText}>CoinQuest</Text>
                  
                  <Text style={styles.subtitle}>Financial adventure awaits</Text>

                  <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}>
                    <TouchableOpacity
                      style={styles.signInButton}
                      onPress={handleSignIn}
                      disabled={isLoading}
                      onPressIn={handlePressIn}
                      onPressOut={handlePressOut}
                    >
                      {isLoading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text style={styles.signInButtonText}>
                          START SAVING
                        </Text>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                  
                  {/* Wallet icon */}
                  <View style={styles.iconContainer}>
                    <Text style={styles.walletIcon}>💼</Text>
                  </View>
                </Animated.View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
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
  dialogCard: {
    width: "100%",
    maxWidth: 400,
    padding: 30,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#2E7D32",
    marginBottom: 15,
    fontFamily: Platform.OS === 'ios' ? "HelveticaNeue-Bold" : "sans-serif-black",
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: "#388E3C",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: Platform.OS === 'ios' ? "HelveticaNeue-Medium" : "sans-serif-medium",
    letterSpacing: 0.3,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
  signInButton: {
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
    backgroundColor: "#2E7D32",
  },
  signInButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    fontFamily: Platform.OS === 'ios' ? "HelveticaNeue-Bold" : "sans-serif-black",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  iconContainer: {
    position: 'absolute',
    bottom: -25,
    backgroundColor: '#1B5E20',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  walletIcon: {
    fontSize: 22,
  },
})

export default SignInScreen 