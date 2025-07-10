import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Teacher, Qualification } from '@/types/teacher';
import { useToast } from '@/components/ui/use-toast';
import { Plus, X } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher;
  onSave: (teacher: Teacher) => Promise<void>;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  teacher,
  onSave,
}): JSX.Element => {
  const [editedTeacher, setEditedTeacher] = useState<Teacher>({ ...teacher });
  const [isSaving, setIsSaving] = useState(false);
  const [newQualification, setNewQualification] = useState<Omit<Qualification, 'id'>>({ 
    name: '', 
    rate: 0, 
    currency: 'INR', 
    type: 'private' 
  });
  const [editingQualification, setEditingQualification] = useState<Qualification | null>(null);
  const { toast } = useToast();

  const statusOptions = ['active', 'inactive', 'pending'] as const;
  const qualificationTypes = ['private', 'group'] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await onSave(editedTeacher);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
        variant: "default",
        className: "bg-green-100 text-green-800 border-green-200"
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (name.startsWith('qualification.')) {
      const [, qualId, field] = name.split('.');
      setEditedTeacher(prev => ({
        ...prev,
        privateQualifications: prev.privateQualifications.map(q => 
          q.id === qualId ? { ...q, [field]: field === 'rate' ? parseFloat(value) : value } : q
        ),
        groupQualifications: prev.groupQualifications.map(q => 
          q.id === qualId ? { ...q, [field]: field === 'rate' ? parseFloat(value) : value } : q
        )
      }));
      return;
    }

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedTeacher(prev => {
        const parentKey = parent as keyof Teacher;
        const parentObj = prev[parentKey];
        
        if (parentObj && typeof parentObj === 'object' && parentObj !== null) {
          return {
            ...prev,
            [parentKey]: {
              ...parentObj,
              [child]: child === 'rate' ? parseFloat(value) : value
            }
          };
        }
        return prev;
      });
    } else {
      setEditedTeacher(prev => ({
        ...prev,
        [name]: name === 'experience' ? parseInt(value, 10) : value
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'status') {
      setEditedTeacher(prev => ({
        ...prev,
        status: value as 'active' | 'inactive' | 'pending'
      }));
    } else if (name === 'qualificationType') {
      setNewQualification(prev => ({
        ...prev,
        type: value as 'private' | 'group'
      }));
    }
  };

  const addQualification = () => {
    if (!newQualification.name || newQualification.rate <= 0) return;
    
    const newQual: Qualification = {
      ...newQualification,
      id: `qual-${Date.now()}`,
      rate: Number(newQualification.rate)
    };

    const qualificationKey = newQualification.type === 'private' 
      ? 'privateQualifications' 
      : 'groupQualifications';

    setEditedTeacher(prev => ({
      ...prev,
      [qualificationKey]: [...prev[qualificationKey], newQual]
    }));

    setNewQualification({ 
      name: '', 
      rate: 0, 
      currency: 'INR', 
      type: 'private' 
    });
  };

  const removeQualification = (id: string, type: 'private' | 'group') => {
    const qualificationKey = type === 'private' 
      ? 'privateQualifications' 
      : 'groupQualifications';

    setEditedTeacher(prev => ({
      ...prev,
      [qualificationKey]: prev[qualificationKey].filter(q => q.id !== id)
    }));
  };

  const startEditingQualification = (qual: Qualification, type: 'private' | 'group') => {
    setEditingQualification(qual);
    setNewQualification(qual);
  };

  const updateQualification = () => {
    if (!editingQualification) return;
    
    const qualificationKey = editingQualification.type === 'private' 
      ? 'privateQualifications' 
      : 'groupQualifications';

    setEditedTeacher(prev => ({
      ...prev,
      [qualificationKey]: prev[qualificationKey].map(q => 
        q.id === editingQualification.id ? { ...newQualification, id: q.id } : q
      )
    }));

    setEditingQualification(null);
    setNewQualification({ name: '', rate: 0, currency: 'INR', type: 'private' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Teacher Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={editedTeacher.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editedTeacher.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={editedTeacher.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editedTeacher.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience (years)</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  value={editedTeacher.experience}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.street">Street</Label>
                <Input
                  id="address.street"
                  name="address.street"
                  value={editedTeacher.address.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.city">City</Label>
                <Input
                  id="address.city"
                  name="address.city"
                  value={editedTeacher.address.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.state">State</Label>
                <Input
                  id="address.state"
                  name="address.state"
                  value={editedTeacher.address.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.country">Country</Label>
                <Input
                  id="address.country"
                  name="address.country"
                  value={editedTeacher.address.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.pincode">Pincode</Label>
                <Input
                  id="address.pincode"
                  name="address.pincode"
                  value={editedTeacher.address.pincode || ''}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Private Qualifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Private Qualifications</h3>
            <div className="space-y-4">
              {editedTeacher.privateQualifications.map(qual => (
                <div key={qual.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor={`qual-${qual.id}-name`}>Name</Label>
                    <Input
                      id={`qual-${qual.id}-name`}
                      name={`qualification.${qual.id}.name`}
                      value={qual.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`qual-${qual.id}-rate`}>Rate</Label>
                    <Input
                      id={`qual-${qual.id}-rate`}
                      name={`qualification.${qual.id}.rate`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={qual.rate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Input value="INR" disabled />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group Qualifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Group Qualifications</h3>
            <div className="space-y-4">
              {editedTeacher.groupQualifications.map(qual => (
                <div key={qual.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor={`group-qual-${qual.id}-name`}>Name</Label>
                    <Input
                      id={`group-qual-${qual.id}-name`}
                      name={`qualification.${qual.id}.name`}
                      value={qual.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`group-qual-${qual.id}-rate`}>Rate</Label>
                    <Input
                      id={`group-qual-${qual.id}-rate`}
                      name={`qualification.${qual.id}.rate`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={qual.rate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Input value="INR" disabled />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Qualification */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="text-lg font-medium">Add New Qualification</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="qual-type">Type</Label>
                <Select
                  value={newQualification.type}
                  onValueChange={(value) => handleSelectChange('qualificationType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualificationTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="qual-name">Name</Label>
                <Input
                  id="qual-name"
                  value={newQualification.name}
                  onChange={(e) => setNewQualification(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Hindustani Vocal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qual-rate">Rate (INR)</Label>
                <Input
                  id="qual-rate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newQualification.rate}
                  onChange={(e) => setNewQualification(prev => ({ ...prev, rate: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Input value="INR" disabled />
              </div>
              <Button
                type="button"
                onClick={editingQualification ? updateQualification : addQualification}
                disabled={!newQualification.name || newQualification.rate <= 0}
                className="self-end"
              >
                {editingQualification ? 'Update' : 'Add'}
              </Button>
            </div>
            {editingQualification && (
              <div className="text-sm text-muted-foreground mt-2">
                Editing: {editingQualification.name}
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="ml-2 h-auto p-0"
                  onClick={() => {
                    setEditingQualification(null);
                    setNewQualification({ name: '', rate: 0, currency: 'INR', type: 'private' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Subjects */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Subjects</h3>
            <div className="space-y-2">
              <Label>Subjects (comma-separated)</Label>
              <Textarea
                value={editedTeacher.subjects.join(', ')}
                onChange={(e) => {
                  const subjects = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                  setEditedTeacher(prev => ({ ...prev, subjects }));
                }}
                placeholder="e.g., Hindustani Classical, Bollywood, Bhajans"
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
