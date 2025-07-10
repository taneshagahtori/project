
import React, { useState } from 'react';
import { Teacher } from '@/types/teacher';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Calendar, 
  DollarSign, 
  Edit,
  Save,
  X,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface TeacherProfileProps {
  teacher: Teacher;
  onUpdate: (teacher: Teacher) => void;
}

const TeacherProfile: React.FC<TeacherProfileProps> = ({ teacher, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState<Teacher>(teacher);

  const handleSave = () => {
    onUpdate(editedTeacher);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTeacher(teacher);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={teacher.avatar} alt={teacher.name} />
                <AvatarFallback className="text-lg">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{teacher.name}</h1>
                <p className="text-muted-foreground">{teacher.subjects.join(', ')}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={getStatusColor(teacher.status)}>
                    {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                  </Badge>
                  <Badge variant="outline">
                    {teacher.experience} years experience
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave} className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={editedTeacher.email}
                  onChange={(e) => setEditedTeacher({...editedTeacher, email: e.target.value})}
                  className="flex-1"
                />
              ) : (
                <span className="text-sm">{teacher.email}</span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={editedTeacher.phone}
                  onChange={(e) => setEditedTeacher({...editedTeacher, phone: e.target.value})}
                  className="flex-1"
                />
              ) : (
                <span className="text-sm">{teacher.phone}</span>
              )}
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      placeholder="Street"
                      value={editedTeacher.address.street}
                      onChange={(e) => setEditedTeacher({
                        ...editedTeacher,
                        address: {...editedTeacher.address, street: e.target.value}
                      })}
                    />
                    <Input
                      placeholder="City"
                      value={editedTeacher.address.city}
                      onChange={(e) => setEditedTeacher({
                        ...editedTeacher,
                        address: {...editedTeacher.address, city: e.target.value}
                      })}
                    />
                  </div>
                ) : (
                  <div className="text-sm space-y-1">
                    <p>{teacher.address.street}</p>
                    <p>{teacher.address.city}</p>
                    <p>{teacher.address.country}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Private Qualifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Private Qualifications
              {isEditing && (
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teacher.privateQualifications.map((qual) => (
                <div key={qual.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium text-sm">{qual.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        ${qual.rate.toFixed(2)} {qual.currency}
                      </span>
                    </div>
                  </div>
                  {isEditing && (
                    <Button size="sm" variant="ghost">
                      <Edit className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Group Qualifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Group Qualifications
              {isEditing && (
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {teacher.groupQualifications.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                No group qualifications added
              </p>
            ) : (
              <div className="space-y-3">
                {teacher.groupQualifications.map((qual) => (
                  <div key={qual.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">{qual.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          ${qual.rate.toFixed(2)} {qual.currency}
                        </span>
                      </div>
                    </div>
                    {isEditing && (
                      <Button size="sm" variant="ghost">
                        <Edit className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherProfile;
