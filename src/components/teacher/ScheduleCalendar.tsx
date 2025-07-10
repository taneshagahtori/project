
import React, { useState } from 'react';
import { ScheduleSlot, DayOfWeek } from '@/types/teacher';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import AddSlotModal from './AddSlotModal';
import { v4 as uuidv4 } from 'uuid';

type ScheduleSlotUpdate = Omit<ScheduleSlot, 'id'> & { id?: string };

interface ScheduleCalendarProps {
  schedule: ScheduleSlot[];
  onSlotClick?: (slot: ScheduleSlot) => void;
  onAddSlot?: (slot: ScheduleSlotUpdate) => void;
  editable?: boolean;
}

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ 
  schedule, 
  onSlotClick, 
  onAddSlot,
  editable = false 
}) => {
  const [isAddSlotModalOpen, setIsAddSlotModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [editingSlot, setEditingSlot] = useState<ScheduleSlot | null>(null);
  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 7; // Start from 7 AM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const getSlotForDayAndTime = (day: DayOfWeek, time: string): ScheduleSlot | undefined => {
    return schedule.find(slot => {
      const slotStart = parseInt(slot.startTime.split(':')[0]);
      const slotEnd = parseInt(slot.endTime.split(':')[0]);
      const currentTime = parseInt(time.split(':')[0]);
      
      return slot.day === day && currentTime >= slotStart && currentTime < slotEnd;
    });
  };

  const getSlotHeight = (slot: ScheduleSlot): number => {
    const start = parseInt(slot.startTime.split(':')[0]);
    const end = parseInt(slot.endTime.split(':')[0]);
    const startMinutes = parseInt(slot.startTime.split(':')[1]);
    const endMinutes = parseInt(slot.endTime.split(':')[1]);
    
    return (end - start) + (endMinutes - startMinutes) / 60;
  };

  const getSlotTypeColor = (type: string): string => {
    switch (type) {
      case 'booked': return 'bg-green-100 text-green-800 border-green-200';
      case 'available': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'break': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSlotClick = (e: React.MouseEvent, slot: ScheduleSlot) => {
    e.stopPropagation();
    if (onSlotClick) {
      onSlotClick(slot);
    }
  };

  const handleAddButtonClick = (day: DayOfWeek, time: string) => {
    setSelectedDay(day);
    setSelectedTime(time);
    
    // Calculate end time (1 hour after start time by default)
    const [hours, minutes] = time.split(':').map(Number);
    const endTime = new Date();
    endTime.setHours(hours + 1, minutes);
    const formattedEndTime = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
    
    setIsAddSlotModalOpen(true);
  };

  const handleAddSlot = (newSlot: ScheduleSlotUpdate) => {
    if (onAddSlot) {
      // If it's an update or deletion, pass it through as-is
      // If it's a new slot, generate an ID
      const slotToAdd = newSlot.id 
        ? newSlot 
        : {
            ...newSlot,
            id: uuidv4()
          };
      onAddSlot(slotToAdd);
    }
    setIsAddSlotModalOpen(false);
    setEditingSlot(null);
  };

  const handleEditSlot = (slot: ScheduleSlot) => {
    setEditingSlot(slot);
    setSelectedDay(slot.day);
    setSelectedTime(slot.startTime);
    setIsAddSlotModalOpen(true);
  };

  const handleDeleteSlot = (slotId: string) => {
    if (onAddSlot) {
      // Find the slot to delete
      const slotToDelete = schedule.find(slot => slot.id === slotId);
      if (slotToDelete) {
        // Create a new object with the same properties but with id set to 'delete' to indicate deletion
        const slotForDeletion: ScheduleSlotUpdate = {
          ...slotToDelete,
          id: 'delete', // Special ID to indicate deletion
        };
        onAddSlot(slotForDeletion);
      }
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Weekly Schedule</span>
            </div>
            {editable && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleAddButtonClick('Monday', '09:00')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Slot
              </Button>
            )}
          </CardTitle>
        </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header with days */}
            <div className="grid grid-cols-8 gap-1 mb-4">
              <div className="text-sm font-medium text-muted-foreground p-2">Time</div>
              {days.map((day) => (
                <div key={day} className="text-sm font-medium text-center p-2 border-b">
                  <div className="hidden sm:block">{day}</div>
                  <div className="sm:hidden">{day.slice(0, 3)}</div>
                </div>
              ))}
            </div>

            {/* Schedule grid */}
            <div className="space-y-1">
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-8 gap-1 min-h-[60px]">
                  <div className="text-xs text-muted-foreground p-2 border-r">
                    {time}
                  </div>
                  {days.map((day) => {
                    const slot = getSlotForDayAndTime(day, time);
                    
                    return (
                      <div
                        key={`${day}-${time}`}
                        className={cn(
                          "p-1 border border-border/50 rounded cursor-pointer transition-colors hover:bg-muted/50",
                          slot && "border-2"
                        )}
                        onClick={() => {
                          if (slot && onSlotClick) {
                            onSlotClick(slot);
                          } else if (!slot && onAddSlot) {
                            handleAddButtonClick(day, time);
                          }
                        }}
                      >
                        {slot && (
                          <div
                            className={cn(
                              "w-full h-full min-h-[50px] rounded p-2 text-xs group relative",
                              getSlotTypeColor(slot.type)
                            )}
                            style={{ 
                              minHeight: `${getSlotHeight(slot) * 50}px`,
                              height: `${getSlotHeight(slot) * 50}px`
                            }}
                            onClick={(e) => handleSlotClick(e, slot)}
                          >
                            <div className="font-medium truncate">{slot.subject || slot.type}</div>
                            {editable && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs text-white hover:bg-white/20"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditSlot(slot);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs text-white hover:bg-white/20"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm('Are you sure you want to delete this slot?')) {
                                      handleDeleteSlot(slot.id);
                                    }
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            )}
                            <div className="text-xs opacity-75 mt-1">
                              {slot.startTime} - {slot.endTime}
                            </div>
                            {slot.studentCount && (
                              <div className="flex items-center space-x-1 mt-1">
                                <Users className="h-3 w-3" />
                                <span>{slot.studentCount}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center space-x-4 mt-6 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
            <span className="text-sm text-muted-foreground">Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-blue-100 border border-blue-200"></div>
            <span className="text-sm text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-gray-100 border border-gray-200"></div>
            <span className="text-sm text-muted-foreground">Break</span>
          </div>
        </div>
      </CardContent>
      </Card>

      <AddSlotModal
        isOpen={isAddSlotModalOpen}
        onClose={() => {
          setIsAddSlotModalOpen(false);
          setEditingSlot(null);
        }}
        onSave={handleAddSlot}
        defaultDay={editingSlot?.day || selectedDay}
        defaultStartTime={editingSlot?.startTime || selectedTime}
        defaultEndTime={editingSlot?.endTime}
        defaultType={editingSlot?.type}
        defaultSubject={editingSlot?.subject}
        defaultStudentCount={editingSlot?.studentCount}
        key={editingSlot?.id || `add-${selectedDay}-${selectedTime}`}
      />
    </>
  );
};

export default ScheduleCalendar;
