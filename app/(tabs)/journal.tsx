import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { Text, IconButton, Surface } from 'react-native-paper';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface Entry {
  id: string;
  text: string;
  timestamp: Date;
}

export default function JournalScreen() {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);

  const addEntry = () => {
    if (!text.trim()) return;
    
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const newEntry: Entry = {
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: new Date(),
    };

    setEntries([newEntry, ...entries]);
    setText('');
  };

  const renderItem = ({ item, index }: { item: Entry, index: number }) => (
    <Animated.View 
      entering={FadeInUp.delay(index * 100).springify()} 
      layout={Layout.springify()}
      style={styles.entryWrapper}
    >
      <View style={styles.timelineLine} />
      <View style={styles.timelineDot} />
      
      <Surface style={styles.card} elevation={0}>
        <Text style={styles.timeText}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Text style={styles.entryText}>{item.text}</Text>
      </Surface>
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Daily Log</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
      </View>

      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Your mind is clear.</Text>
            <Text style={styles.emptySubText}>Capture a thought to begin.</Text>
          </View>
        }
      />

      <Surface style={styles.inputContainer} elevation={4}>
        <TextInput
          style={styles.input}
          placeholder="Write your thought..."
          placeholderTextColor="#64748B"
          value={text}
          onChangeText={setText}
          multiline
        />
        <IconButton
          icon="arrow-up"
          mode="contained"
          containerColor={text.trim() ? '#38BDF8' : '#334155'}
          iconColor="white"
          size={24}
          onPress={addEntry}
          disabled={!text.trim()}
        />
      </Surface>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#0F172A',
    zIndex: 10,
  },
  title: { color: '#F8FAFC', fontWeight: '800', letterSpacing: -0.5 },
  date: { color: '#94A3B8', fontSize: 14, fontWeight: '500', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 },
  
  listContent: { padding: 20, paddingBottom: 100 },
  
  entryWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 6,
    top: 20,
    bottom: -20,
    width: 2,
    backgroundColor: '#1E293B',
    zIndex: -1,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#38BDF8',
    borderWidth: 3,
    borderColor: '#0F172A',
    marginTop: 6,
    marginRight: 15,
  },
  card: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 16,
    borderCurve: 'continuous', // smoother iOS corners
  },
  timeText: { color: '#94A3B8', fontSize: 12, marginBottom: 4, fontWeight: '600' },
  entryText: { color: '#E2E8F0', fontSize: 16, lineHeight: 24 },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1E293B',
    margin: 16,
    borderRadius: 30,
    marginBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    maxHeight: 100,
    paddingRight: 10,
    paddingVertical: 8,
  },
  emptyState: { alignItems: 'center', marginTop: 100, opacity: 0.5 },
  emptyText: { color: '#F8FAFC', fontSize: 18, fontWeight: '600' },
  emptySubText: { color: '#94A3B8', marginTop: 8 },
});