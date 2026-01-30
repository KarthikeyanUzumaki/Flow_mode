import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSpring, 
  Easing,
  FadeInDown,
  withSequence
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatTime } from '../../src/logic/timer';

const FOCUS_TIME = 1500; 
const { width } = Dimensions.get('window');

export default function FlowModeScreen() {
  const [seconds, setSeconds] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);

  // Animation values
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.3);
  const buttonScale = useSharedValue(1);

  // Start breathing animation when active
  useEffect(() => {
    if (isActive) {
      pulseScale.value = withRepeat(
        withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) }),
        -1, 
        true
      );
      pulseOpacity.value = withRepeat(
        withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) }),
        -1, 
        true
      );
    } else {
      pulseScale.value = withTiming(1);
      pulseOpacity.value = withTiming(0.1);
    }
  }, [isActive]);

  // Timer Logic
  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsActive(!isActive);
    buttonScale.value = withSequence(withSpring(0.9), withSpring(1));
  };

  const resetTimer = () => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsActive(false);
    setSeconds(FOCUS_TIME);
  };

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Background Pulse Effect */}
      <View style={styles.pulseContainer}>
        <Animated.View style={[styles.pulseCircle, animatedPulseStyle]} />
      </View>

      <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.header}>
        <Text variant="labelLarge" style={styles.statusText}>
          {isActive ? 'FOCUSING...' : 'READY TO FLOW'}
        </Text>
      </Animated.View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      </View>

      <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.controls}>
        <TouchableOpacity onPress={resetTimer} style={styles.secondaryBtn}>
          <MaterialCommunityIcons name="refresh" size={24} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleTimer} activeOpacity={0.8}>
          <Animated.View style={[styles.playButton, animatedButtonStyle, { backgroundColor: isActive ? '#EF4444' : '#38BDF8' }]}>
            <MaterialCommunityIcons name={isActive ? "pause" : "play"} size={40} color="white" />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
           {/* Placeholder for settings or sound toggle */}
          <MaterialCommunityIcons name="cog-outline" size={24} color="#94A3B8" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F172A', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  pulseContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  pulseCircle: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
  },
  header: {
    position: 'absolute',
    top: 80,
  },
  statusText: {
    color: '#94A3B8',
    letterSpacing: 4,
    fontWeight: '700',
    fontSize: 12
  },
  timerContainer: {
    marginBottom: 40,
  },
  timerText: {
    fontSize: 90,
    fontWeight: '200',
    color: '#F8FAFC',
    fontVariant: ['tabular-nums'], // Keeps numbers monospaced so they don't jitter
    letterSpacing: -2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  secondaryBtn: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
  }
});