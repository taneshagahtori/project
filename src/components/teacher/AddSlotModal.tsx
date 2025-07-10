import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DayOfWeek, ScheduleSlot } from '@/types/teacher';

export interface AddSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (slot: Omit<ScheduleSlot, 'id'> | ScheduleSlot) => void;
  defaultDay?: DayOfWeek;
  defaultStartTime?: string;
  defaultEndTime?: string;
  defaultType?: 'available' | 'booked' | 'break';
  defaultSubject?: string;
  defaultStudentCount?: number;
}

const AddSlotModal: React.FC<AddSlotModalProps> = ({
  isOpen,
  onClose,
  onSave,
  defaultDay = 'Monday',
  defaultStartTime = '09:00',
  defaultEndTime,
  defaultType = 'available',
  defaultSubject = '',
  defaultStudentCount = 0,
}) => {
  const [formData, setFormData] = useState<Omit<ScheduleSlot, 'id'>>(() => {
    // If we have defaultEndTime, use it; otherwise calculate 1 hour after start time
    let endTimeValue = defaultEndTime;
    if (!endTimeValue) {
      const [hours, minutes] = defaultStartTime.split(':').map(Number);
      const endTime = new Date();
      endTime.setHours(hours + 1, minutes);
      endTimeValue = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
    }
    
    return {
      day: defaultDay,
      startTime: defaultStartTime,
      endTime: endTimeValue,
      type: defaultType,
      subject: defaultSubject,
      studentCount: defaultStudentCount,
    };
  });
  
  // Update form data when default props change
  React.useEffect(() => {
    let endTimeValue = defaultEndTime;
    if (!endTimeValue) {
      const [hours, minutes] = defaultStartTime.split(':').map(Number);
      const endTime = new Date();
      endTime.setHours(hours + 1, minutes);
      endTimeValue = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
    }
    
    setFormData({
      day: defaultDay,
      startTime: defaultStartTime,
      endTime: endTimeValue,
      type: defaultType || 'available',
      subject: defaultSubject || '',
      studentCount: defaultStudentCount || 0,
    });
  }, [defaultDay, defaultStartTime, defaultEndTime, defaultType, defaultSubject, defaultStudentCount]);

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 7; // 7 AM to 9 PM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleTimeChange = (field: 'startTime' | 'endTime', value: string) => {
    setFormData(prev => {
      // If we're updating start time and the new start time is after the current end time,
      // automatically update the end time to be 1 hour after the new start time
      if (field === 'startTime') {
        const [hours, minutes] = value.split(':').map(Number);
        const endTime = new Date();
        endTime.setHours(hours + 1, minutes);
        const formattedEndTime = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
        
        return {
          ...prev,
          startTime: value,
          endTime: formattedEndTime
        };
      }
      
      // Otherwise just update the specified field
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Time Slot</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="day">Day</Label>
              <Select
                value={formData.day}
                onValueChange={(value) => setFormData(prev => ({ ...prev, day: value as DayOfWeek }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as 'available' | 'booked' | 'break' }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="break">Break</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Select
                value={formData.startTime}
                onValueChange={(value) => handleTimeChange('startTime', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={`start-${time}`} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Select
                value={formData.endTime}
                onValueChange={(value) => handleTimeChange('endTime', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select end time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots
                    .filter(time => time > formData.startTime) // Only show times after start time
                    .map((time) => (
                      <SelectItem key={`end-${time}`} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.type === 'booked' && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter subject"
              />
            </div>
          )}

          {formData.type === 'booked' && (
            <div className="space-y-2">
              <Label htmlFor="studentCount">Number of Students</Label>
              <Input
                id="studentCount"
                type="number"
                min="1"
                value={formData.studentCount || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, studentCount: parseInt(e.target.value) || 0 }))}
              />
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Slot
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSlotModal;
