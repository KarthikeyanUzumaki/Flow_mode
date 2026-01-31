import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar, List, Switch, Divider, Button, PaperProvider } from 'react-native-paper';

export default function ProfileScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>Profile</Text>
        </View>

        <ScrollView>
          <View style={styles.profileSection}>
            <Avatar.Text size={80} label="ME" style={styles.avatar} color="#F8FAFC" />
            <Text variant="titleLarge" style={styles.name}>Flow User</Text>
            <Text variant="bodyMedium" style={styles.subtext}>Productivity Enthusiast</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text variant="headlineMedium" style={styles.statNumber}>12</Text>
              <Text variant="bodySmall" style={styles.statLabel}>Hours Focused</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <Text variant="headlineMedium" style={styles.statNumber}>5</Text>
              <Text variant="bodySmall" style={styles.statLabel}>Journal Entries</Text>
            </View>
          </View>

          <View style={styles.settingsSection}>
            <List.Section>
              <List.Subheader style={styles.subheader}>Appearance</List.Subheader>
              <List.Item
                title="Dark Theme"
                titleStyle={styles.settingText}
                left={() => <List.Icon icon="theme-light-dark" color="#94A3B8" />}
                right={() => <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} color="#38BDF8" />}
              />
              <Divider style={styles.listDivider} />
              <List.Subheader style={styles.subheader}>Preferences</List.Subheader>
              <List.Item
                title="Notifications"
                titleStyle={styles.settingText}
                left={() => <List.Icon icon="bell-outline" color="#94A3B8" />}
                right={() => <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} color="#38BDF8" />}
              />
            </List.Section>

            <Button mode="outlined" style={styles.logoutButton} textColor="#EF4444">
              Log Out
            </Button>
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', paddingTop: 60 },
  header: { paddingHorizontal: 20, marginBottom: 20 },
  title: { color: '#F8FAFC', fontWeight: 'bold' },
  profileSection: { alignItems: 'center', marginBottom: 30 },
  avatar: { backgroundColor: '#38BDF8', marginBottom: 10 },
  name: { color: '#F8FAFC', fontWeight: 'bold' },
  subtext: { color: '#94A3B8' },
  statsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30, backgroundColor: '#1E293B', marginHorizontal: 20, borderRadius: 15, padding: 20 },
  statBox: { alignItems: 'center', flex: 1 },
  divider: { width: 1, backgroundColor: '#334155' },
  statNumber: { color: '#38BDF8', fontWeight: 'bold' },
  statLabel: { color: '#94A3B8' },
  settingsSection: { paddingHorizontal: 10 },
  subheader: { color: '#38BDF8', fontWeight: 'bold' },
  settingText: { color: '#F8FAFC' },
  listDivider: { backgroundColor: '#334155' },
  logoutButton: { margin: 20, borderColor: '#EF4444' }
});