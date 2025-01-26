import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { format, startOfWeek, addDays, subWeeks, addWeeks } from 'date-fns';

const WeekCalendar = () => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [isModalVisible, setModalVisible] = useState(false);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, index) =>
      addDays(currentWeekStart, index)
    );
  }, [currentWeekStart]);

  const handleDaySelect = useCallback((day: Date) => {
    setSelectedDay(day);
    setModalVisible(true);
  }, []);

  const goToPreviousWeek = useCallback(() => {
    setCurrentWeekStart(prev => startOfWeek(subWeeks(prev, 1), { weekStartsOn: 1 }));
  }, []);

  const goToNextWeek = useCallback(() => {
    setCurrentWeekStart(prev => startOfWeek(addWeeks(prev, 1), { weekStartsOn: 1 }));
  }, []);

  const getPopupContentForDay = (day: Date) => {
    const dayName = format(day, 'EEEE');
    switch (dayName) {
      case 'Monday':
        return 'Here is your meal plan for Monday. \n\n\n Here is your suggested workout\n';
      case 'Tuesday':
        return 'Here is your meal plan for Tuesday. \n\n\n Here is your suggested workout\n';
      case 'Wednesday':
        return 'Here is your meal plan for Wednesday. \n\n\n Here is your suggested workout\n';
      case 'Thursday':
        return 'Here is your meal plan for Thursday. \n\n\n Here is your suggested workout\n';
      case 'Friday':
        return 'Here is your meal plan for Friday. \n\n\n Here is your suggested workout\n';
      case 'Saturday':
        return 'Here is your meal plan for Saturday. \n\n\n Here is your suggested workout\n';
      case 'Sunday':
        return 'Here is your meal plan for Sunday. \n\n\n Here is your suggested workout\n';
      default:
        return 'haiiiii';
    }
  };

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

      {/* Modal for Popup */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {selectedDay ? format(selectedDay, 'EEEE, MMMM d') : ''}
            </Text>
            <Text style={styles.modalContent}>
              {selectedDay ? getPopupContentForDay(selectedDay) : ''}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    top: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
    color: '#53444D',
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
    shadowRadius: 4,
  },
  weekText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#53444D',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#53444D',
  },
  modalContent: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#53444D',
  },
  closeButton: {
    backgroundColor: '#FE8268',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default WeekCalendar;
