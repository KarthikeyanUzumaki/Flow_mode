import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarStyle: { 
        backgroundColor: '#1E293B', 
        borderTopWidth: 0, 
        position: 'absolute', 
        bottom: 30, 
        left: 20, 
        right: 20, 
        borderRadius: 30, 
        height: 70, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5, 
      }, 
      headerShown: false,
      tabBarActiveTintColor: '#38BDF8',
      tabBarInactiveTintColor: '#64748B',
      tabBarShowLabel: false, 
      tabBarItemStyle: { 
        height: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingTop: 12, // Pushes icons down to true center
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Flow',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={focused ? "timer" : "timer-outline"} size={32} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={focused ? "notebook" : "notebook-outline"} size={32} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={focused ? "account-circle" : "account-circle-outline"} size={32} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }
});