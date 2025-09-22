import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Plus, Search, FileText, Send, X, Calendar } from 'lucide-react-native';
import { useLanguage } from '@/hooks/useLanguage';
import { useOfflineSync } from '@/hooks/useOfflineSync';

interface Prescription {
  id: string;
  patientName: string;
  medicines: Medicine[];
  createdDate: string;
  status: 'sent' | 'pending' | 'draft';
}

interface Medicine {
  name: string;
  dosage: string;
  duration: string;
  instructions: string;
}

export default function Prescriptions() {
  const { t } = useLanguage();
  const { addToSyncQueue } = useOfflineSync();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    medicines: [{ name: '', dosage: '', duration: '', instructions: '' }],
  });

  const prescriptions: Prescription[] = [
    {
      id: '1',
      patientName: 'Rajesh Kumar',
      medicines: [
        {
          name: 'Amlodipine',
          dosage: '5mg',
          duration: '30 days',
          instructions: 'Once daily with breakfast',
        },
        {
          name: 'Metformin',
          dosage: '500mg',
          duration: '30 days',
          instructions: 'Twice daily after meals',
        },
      ],
      createdDate: '2024-01-15',
      status: 'sent',
    },
    {
      id: '2',
      patientName: 'Preet Kaur',
      medicines: [
        {
          name: 'Insulin Glargine',
          dosage: '20 units',
          duration: '30 days',
          instructions: 'Once daily at bedtime',
        },
      ],
      createdDate: '2024-01-14',
      status: 'pending',
    },
  ];

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addMedicine = () => {
    setNewPrescription(prev => ({
      ...prev,
      medicines: [...prev.medicines, { name: '', dosage: '', duration: '', instructions: '' }],
    }));
  };

  const updateMedicine = (index: number, field: keyof Medicine, value: string) => {
    setNewPrescription(prev => ({
      ...prev,
      medicines: prev.medicines.map((medicine, i) =>
        i === index ? { ...medicine, [field]: value } : medicine
      ),
    }));
  };

  const savePrescription = async () => {
    const prescription = {
      ...newPrescription,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0],
      status: 'draft' as const,
    };

    await addToSyncQueue({
      type: 'prescription',
      data: prescription,
    });

    setIsCreateModalVisible(false);
    setNewPrescription({
      patientName: '',
      medicines: [{ name: '', dosage: '', duration: '', instructions: '' }],
    });
  };

  const renderPrescriptionCard = (prescription: Prescription) => (
    <View key={prescription.id} style={styles.prescriptionCard}>
      <View style={styles.cardHeader}>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{prescription.patientName}</Text>
          <View style={styles.dateContainer}>
            <Calendar size={14} color="#6B7280" />
            <Text style={styles.dateText}>{prescription.createdDate}</Text>
          </View>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: prescription.status === 'sent' ? '#DCFCE7' : prescription.status === 'pending' ? '#FEF3C7' : '#F3F4F6' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: prescription.status === 'sent' ? '#059669' : prescription.status === 'pending' ? '#D97706' : '#6B7280' }
          ]}>
            {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.medicinesContainer}>
        {prescription.medicines.map((medicine, index) => (
          <View key={index} style={styles.medicineRow}>
            <Text style={styles.medicineName}>{medicine.name}</Text>
            <Text style={styles.medicineDetails}>
              {medicine.dosage} - {medicine.duration}
            </Text>
            <Text style={styles.medicineInstructions}>{medicine.instructions}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}>
          <Send size={16} color="#FFFFFF" />
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('prescriptions')}</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search prescriptions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setIsCreateModalVisible(true)}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.createButtonText}>{t('createPrescription')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredPrescriptions.map(renderPrescriptionCard)}
      </ScrollView>

      <Modal
        visible={isCreateModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create New Prescription</Text>
            <TouchableOpacity
              onPress={() => setIsCreateModalVisible(false)}
              style={styles.closeButton}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Patient Name</Text>
              <TextInput
                style={styles.input}
                value={newPrescription.patientName}
                onChangeText={(text) => setNewPrescription(prev => ({ ...prev, patientName: text }))}
                placeholder="Enter patient name"
              />
            </View>

            <Text style={styles.sectionTitle}>Medicines</Text>
            {newPrescription.medicines.map((medicine, index) => (
              <View key={index} style={styles.medicineForm}>
                <Text style={styles.medicineFormTitle}>Medicine {index + 1}</Text>
                
                <TextInput
                  style={styles.input}
                  value={medicine.name}
                  onChangeText={(text) => updateMedicine(index, 'name', text)}
                  placeholder={t('medicineName')}
                />
                
                <View style={styles.rowInputs}>
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    value={medicine.dosage}
                    onChangeText={(text) => updateMedicine(index, 'dosage', text)}
                    placeholder={t('dosage')}
                  />
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    value={medicine.duration}
                    onChangeText={(text) => updateMedicine(index, 'duration', text)}
                    placeholder={t('duration')}
                  />
                </View>
                
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={medicine.instructions}
                  onChangeText={(text) => updateMedicine(index, 'instructions', text)}
                  placeholder="Instructions"
                  multiline
                  numberOfLines={3}
                />
              </View>
            ))}

            <TouchableOpacity style={styles.addMedicineButton} onPress={addMedicine}>
              <Plus size={20} color="#2563EB" />
              <Text style={styles.addMedicineText}>Add Another Medicine</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsCreateModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={savePrescription}>
              <Text style={styles.saveButtonText}>Save Prescription</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 24,
  },
  prescriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  patientInfo: {},
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  medicinesContainer: {
    gap: 12,
    marginBottom: 16,
  },
  medicineRow: {
    paddingLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#E5E7EB',
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  medicineDetails: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
    marginBottom: 2,
  },
  medicineInstructions: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  sendButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#2563EB',
  },
  sendButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  medicineForm: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  medicineFormTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 12,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  addMedicineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 12,
    borderStyle: 'dashed',
  },
  addMedicineText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2563EB',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#2563EB',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});