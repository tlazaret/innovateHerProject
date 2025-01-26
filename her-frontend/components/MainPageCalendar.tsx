import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { format, startOfWeek, addDays, subWeeks, addWeeks } from 'date-fns';


const WeekCalendar = () => {
  
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, index) =>
      addDays(currentWeekStart, index)
    );
  }, [currentWeekStart]);

  const handleDaySelect = useCallback((day: Date) => {
    setSelectedDay(day);
  }, []);

  const goToPreviousWeek = useCallback(() => {
    setCurrentWeekStart(prev => startOfWeek(subWeeks(prev, 1), { weekStartsOn: 1 }));
  }, []);

  const goToNextWeek = useCallback(() => {
    setCurrentWeekStart(prev => startOfWeek(addWeeks(prev, 1), { weekStartsOn: 1 }));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weekly Calendar</Text>

      <View style={styles.navigation}>
        <TouchableOpacity onPress={goToPreviousWeek}>
          <Text style={styles.navButton}>Previous</Text>
        </TouchableOpacity>

        <Text style={styles.weekText}>
        {format(currentWeekStart, 'MMM dd, yyyy')} - {format(addDays(currentWeekStart, 6), 'MMM dd, yyyy')}
        </Text>

        <TouchableOpacity onPress={goToNextWeek}>
          <Text style={styles.navButton}>Next</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={weekDays}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayCard,
              selectedDay?.toDateString() === item.toDateString() && styles.selectedDay,
            ]}
            onPress={() => handleDaySelect(item)}
          >
            <Text style={styles.dayText}>{format(item, 'EEE')}</Text>
            <Text style={styles.dateText}>{format(item, 'd')}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.toISOString()}
        contentContainerStyle={styles.weekRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    top: 45 ,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
    color: '#53444D'
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  navButton: {
    fontSize: 14,
    //fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: '#53444D',
    paddingVertical: 5,  
    paddingHorizontal: 5,  
    borderRadius: 5, 
    textAlign: 'center',  
    alignItems: 'center',  
    justifyContent: 'center', 
    elevation: 3,  
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.2,  
    shadowRadius: 4
  },
  weekText: {
    fontSize: 16,
    fontWeight: 'bold',
    //fontStyle: 'italic',
    color: '#53444D'
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCard: {
    width: 40,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 4,
  },
  selectedDay: {
    backgroundColor: '#FE8268',
  },
  dayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#53444D',
  },
  dateText: {
    fontSize: 16,
    color: '#53444D',
  },
});

export default WeekCalendar;