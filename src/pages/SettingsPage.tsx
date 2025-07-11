import React, { useState } from "react";
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import Typography from '@/components/ui/typography';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const mockAccount = {
  name: 'Priya Sharma',
  displayName: 'Priya',
  email: 'priya.sharma@example.com',
  phone: '+91 98765 43210',
  dob: '1990-05-15',
  photo: '',
};

const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Account info state
  const [account, setAccount] = useState(mockAccount);
  const [editing, setEditing] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [notifPrefs, setNotifPrefs] = useState({
    email: true,
    sms: false,
    emailMessages: true,
    emailSchedule: true,
    emailPayments: true,
    smsMessages: false,
    smsSchedule: false,
    smsPayments: false,
    push: false,
  });
  const [appPrefs, setAppPrefs] = useState({ calendar: 'week', theme: 'light' });

  // Profile settings state
  const [profile, setProfile] = useState({
    photo: mockAccount.photo,
    name: mockAccount.name,
    displayName: mockAccount.displayName,
    email: mockAccount.email,
    phone: mockAccount.phone,
    dob: mockAccount.dob,
  });
  const [profileEditing, setProfileEditing] = useState(false);

  const [username, setUsername] = useState('priya.sharma');
  const [editingUsername, setEditingUsername] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState({ google: false, microsoft: false });
  const [dangerOpen, setDangerOpen] = useState<'none' | 'delete' | 'deactivate'>('none');
  const [dangerConfirm, setDangerConfirm] = useState('');

  const handleAccountSave = () => {
    setEditing(false);
    // Mock save
  };
  const handlePasswordChange = () => {
    setPasswords({ current: '', new: '', confirm: '' });
    // Mock password change
    alert('Password changed (mock)');
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile(p => ({ ...p, photo: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleProfileSave = () => {
    setProfileEditing(false);
    // Mock save
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuToggle={toggleSidebar} isMobile={isMobile} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <span>Settings</span>
                </div>
                <Typography.H1>Settings</Typography.H1>
                <Typography.Body className="mt-1">Manage your account, security, notifications, and app preferences.</Typography.Body>
              </div>
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      {profile.photo ? (
                        <AvatarImage src={profile.photo} alt={profile.name} />
                      ) : (
                        <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      )}
                    </Avatar>
                    {profileEditing && (
                      <label className="block">
                        <span className="sr-only">Change photo</span>
                        <Input type="file" accept="image/*" onChange={handleProfilePhotoChange} />
                      </label>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input value={profile.name} disabled={!profileEditing} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">Display Name</label>
                    <Input value={profile.displayName} disabled={!profileEditing} onChange={e => setProfile(p => ({ ...p, displayName: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">Preferred Contact Email</label>
                    <Input value={profile.email} disabled={!profileEditing} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input value={profile.phone} disabled={!profileEditing} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">Date of Birth</label>
                    <Input type="date" value={profile.dob} disabled={!profileEditing} onChange={e => setProfile(p => ({ ...p, dob: e.target.value }))} />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {profileEditing ? (
                      <>
                        <Button size="sm" onClick={handleProfileSave}>Save</Button>
                        <Button size="sm" variant="outline" onClick={() => setProfileEditing(false)}>Cancel</Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => setProfileEditing(true)}>Edit</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              {/* Account Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">Name</label>
                    <Input value={account.name} disabled={!editing} onChange={e => setAccount(a => ({ ...a, name: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">Email</label>
                    <Input value={account.email} disabled={!editing} onChange={e => setAccount(a => ({ ...a, email: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">Phone</label>
                    <Input value={account.phone} disabled={!editing} onChange={e => setAccount(a => ({ ...a, phone: e.target.value }))} />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {editing ? (
                      <>
                        <Button size="sm" onClick={handleAccountSave}>Save</Button>
                        <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => setEditing(true)}>Edit</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              {/* Login/Security */}
              <Card>
                <CardHeader>
                  <CardTitle>Login & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Username */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">Username</label>
                    <div className="flex gap-2 items-center">
                      <Input value={username} disabled={!editingUsername} onChange={e => setUsername(e.target.value)} />
                      {editingUsername ? (
                        <>
                          <Button size="sm" onClick={() => setEditingUsername(false)}>Save</Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingUsername(false)}>Cancel</Button>
                        </>
                      ) : (
                        <Button size="sm" onClick={() => setEditingUsername(true)}>Edit</Button>
                      )}
                    </div>
                  </div>
                  {/* Change Password */}
                  <div className="space-y-2 border-t pt-4">
                    <label className="text-sm font-medium">Change Password</label>
                    <div className="flex flex-col gap-3">
                      <Input type="password" placeholder="Current Password" value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} />
                      <Input type="password" placeholder="New Password" value={passwords.new} onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))} />
                      <Input type="password" placeholder="Confirm New Password" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} />
                      <Button size="sm" onClick={handlePasswordChange} disabled={!passwords.current || !passwords.new || passwords.new !== passwords.confirm}>Change Password</Button>
                    </div>
                  </div>
                  {/* 2FA Toggle */}
                  <div className="flex items-center justify-between border-t pt-4">
                    <span>Two-Factor Authentication (2FA)</span>
                    <Switch checked={twoFA} onCheckedChange={setTwoFA} />
                  </div>
                  {/* Linked Accounts */}
                  <div className="space-y-2 border-t pt-4">
                    <label className="text-sm font-medium">Linked Accounts</label>
                    <div className="flex gap-4">
                      <Button size="sm" variant={linkedAccounts.google ? 'default' : 'outline'} onClick={() => setLinkedAccounts(a => ({ ...a, google: !a.google }))}>
                        {linkedAccounts.google ? 'Unlink Google' : 'Link Google'}
                      </Button>
                      <Button size="sm" variant={linkedAccounts.microsoft ? 'default' : 'outline'} onClick={() => setLinkedAccounts(a => ({ ...a, microsoft: !a.microsoft }))}>
                        {linkedAccounts.microsoft ? 'Unlink Microsoft' : 'Link Microsoft'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="font-medium mb-2">Email Notifications</div>
                  <div className="flex items-center justify-between">
                    <span>New Messages</span>
                    <Switch checked={notifPrefs.emailMessages} onCheckedChange={v => setNotifPrefs(p => ({ ...p, emailMessages: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Schedule Changes</span>
                    <Switch checked={notifPrefs.emailSchedule} onCheckedChange={v => setNotifPrefs(p => ({ ...p, emailSchedule: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment Updates</span>
                    <Switch checked={notifPrefs.emailPayments} onCheckedChange={v => setNotifPrefs(p => ({ ...p, emailPayments: v }))} />
                  </div>
                  <div className="font-medium mt-6 mb-2">SMS Notifications</div>
                  <div className="flex items-center justify-between">
                    <span>New Messages</span>
                    <Switch checked={notifPrefs.smsMessages} onCheckedChange={v => setNotifPrefs(p => ({ ...p, smsMessages: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Schedule Changes</span>
                    <Switch checked={notifPrefs.smsSchedule} onCheckedChange={v => setNotifPrefs(p => ({ ...p, smsSchedule: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment Updates</span>
                    <Switch checked={notifPrefs.smsPayments} onCheckedChange={v => setNotifPrefs(p => ({ ...p, smsPayments: v }))} />
                  </div>
                  <div className="font-medium mt-6 mb-2">App Push Notifications</div>
                  <div className="flex items-center justify-between">
                    <span>Enable Push Notifications</span>
                    <Switch checked={notifPrefs.push} onCheckedChange={v => setNotifPrefs(p => ({ ...p, push: v }))} />
                  </div>
                </CardContent>
              </Card>
              {/* App Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>App Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Calendar Display</span>
                    <select className="border rounded px-2 py-1" value={appPrefs.calendar} onChange={e => setAppPrefs(p => ({ ...p, calendar: e.target.value }))}>
                      <option value="week">Week View</option>
                      <option value="month">Month View</option>
                      <option value="day">Day View</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Theme</span>
                    <select className="border rounded px-2 py-1" value={appPrefs.theme} onChange={e => setAppPrefs(p => ({ ...p, theme: e.target.value }))}>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
              {/* General Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <Typography.Body className="text-muted-foreground">Other settings and preferences can be managed here in the future.</Typography.Body>
                </CardContent>
              </Card>
              {/* Danger Zone */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button variant="destructive" onClick={() => setDangerOpen('deactivate')}>Deactivate Account</Button>
                    <Button variant="destructive" onClick={() => setDangerOpen('delete')}>Delete Account</Button>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Deactivating disables your account but keeps your data. Deleting is permanent and cannot be undone.</div>
                </CardContent>
              </Card>
              {/* Danger Zone Dialogs */}
              <Dialog open={dangerOpen === 'delete'} onOpenChange={open => { if (!open) { setDangerOpen('none'); setDangerConfirm(''); } }}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription>
                      This action is <span className="text-red-600 font-bold">permanent</span>. Type <b>DELETE</b> to confirm.
                    </DialogDescription>
                  </DialogHeader>
                  <Input placeholder="Type DELETE to confirm" value={dangerConfirm} onChange={e => setDangerConfirm(e.target.value)} />
                  <Button variant="destructive" className="w-full" disabled={dangerConfirm !== 'DELETE'} onClick={() => { setDangerOpen('none'); setDangerConfirm(''); alert('Account deleted (mock)'); }}>Delete Account</Button>
                </DialogContent>
              </Dialog>
              <Dialog open={dangerOpen === 'deactivate'} onOpenChange={open => { if (!open) { setDangerOpen('none'); setDangerConfirm(''); } }}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Deactivate Account</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to deactivate your account? You can reactivate by logging in again.
                    </DialogDescription>
                  </DialogHeader>
                  <Button variant="destructive" className="w-full" onClick={() => { setDangerOpen('none'); alert('Account deactivated (mock)'); }}>Deactivate Account</Button>
                </DialogContent>
              </Dialog>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 