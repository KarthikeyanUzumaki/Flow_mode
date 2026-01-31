import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarStyle: { backgroundColor: '#1E293B', borderTopWidth: 0, height: 60 }, 
      headerShown: false,
      tabBarActiveTintColor: '#38BDF8',
      tabBarInactiveTintColor: '#94A3B8',
      tabBarLabelStyle: { fontSize: 12, marginBottom: 5 }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Flow',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="timer-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}