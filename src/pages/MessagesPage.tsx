import React, { useState } from "react";
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import Typography from '@/components/ui/typography';
import { Badge } from '@/components/ui/badge';

const mockThreads = [
  {
    id: '1',
    name: 'Priya Patel (Student)',
    lastMessage: 'Thank you for the lesson, sir!',
    timestamp: '2024-01-10 14:32',
    unread: true,
  },
  {
    id: '2',
    name: 'Admin',
    lastMessage: 'Your payment has been processed.',
    timestamp: '2024-01-10 12:10',
    unread: false,
  },
  {
    id: '3',
    name: 'Aarav Sharma (Student)',
    lastMessage: 'Can we reschedule tomorrow’s class?',
    timestamp: '2024-01-09 18:45',
    unread: true,
  },
  {
    id: '4',
    name: 'Rahul Verma (Teacher)',
    lastMessage: 'Please review the new timetable.',
    timestamp: '2024-01-09 10:20',
    unread: false,
  },
  {
    id: '5',
    name: 'Support',
    lastMessage: 'We have updated your profile as requested.',
    timestamp: '2024-01-08 16:00',
    unread: false,
  },
];

const mockMessages: Record<string, { id: string; sender: string; content: string; timestamp: string }[]> = {
  '1': [
    { id: 'm1', sender: 'Priya Patel', content: 'Thank you for the lesson, sir!', timestamp: '2024-01-10 14:32' },
    { id: 'm2', sender: 'You', content: 'You did great today, Priya!', timestamp: '2024-01-10 14:30' },
    { id: 'm3', sender: 'Priya Patel', content: 'Looking forward to the next class.', timestamp: '2024-01-10 14:28' },
  ],
  '2': [
    { id: 'm1', sender: 'Admin', content: 'Your payment has been processed.', timestamp: '2024-01-10 12:10' },
    { id: 'm2', sender: 'You', content: 'Thank you!', timestamp: '2024-01-10 12:09' },
  ],
  '3': [
    { id: 'm1', sender: 'Aarav Sharma', content: 'Can we reschedule tomorrow’s class?', timestamp: '2024-01-09 18:45' },
    { id: 'm2', sender: 'You', content: 'Sure, what time works for you?', timestamp: '2024-01-09 18:44' },
  ],
  '4': [
    { id: 'm1', sender: 'Rahul Verma', content: 'Please review the new timetable.', timestamp: '2024-01-09 10:20' },
    { id: 'm2', sender: 'You', content: 'Looks good, thanks!', timestamp: '2024-01-09 10:18' },
  ],
  '5': [
    { id: 'm1', sender: 'Support', content: 'We have updated your profile as requested.', timestamp: '2024-01-08 16:00' },
    { id: 'm2', sender: 'You', content: 'Thank you for the quick update.', timestamp: '2024-01-08 15:59' },
  ],
};

const MessagesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [threads, setThreads] = useState(mockThreads);
  const [messages, setMessages] = useState(mockMessages);

  const handleThreadClick = (id: string) => {
    setSelectedThreadId(id);
    setThreads(prev => prev.map(t => t.id === id ? { ...t, unread: false } : t));
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedThreadId) return;
    setMessages(prev => ({
      ...prev,
      [selectedThreadId]: [
        ...prev[selectedThreadId],
        {
          id: `m${prev[selectedThreadId].length + 1}`,
          sender: 'You',
          content: messageInput,
          timestamp: new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
        },
      ],
    }));
    setMessageInput('');
  };

  // Responsive layout: sidebar (inbox) and chat view
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuToggle={toggleSidebar} isMobile={isMobile} />
          <main className="flex-1 overflow-y-auto p-0 md:p-6 lg:p-8 flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 max-w-md border-r bg-card h-full flex flex-col">
              <div className="p-4 border-b">
                <Typography.H1 className="text-xl">Inbox</Typography.H1>
                <Typography.Body className="mt-1 text-sm">All your conversations</Typography.Body>
              </div>
              <div className="flex-1 overflow-y-auto divide-y">
                {threads.map(thread => (
                  <div
                    key={thread.id}
                    className={`flex items-center justify-between px-4 py-4 hover:bg-muted transition cursor-pointer ${thread.unread ? 'font-semibold bg-blue-50' : ''} ${selectedThreadId === thread.id ? 'bg-muted' : ''}`}
                    onClick={() => handleThreadClick(thread.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-base text-foreground">{thread.name}</span>
                        {thread.unread && <Badge className="bg-blue-600 text-white ml-2 animate-pulse">Unread</Badge>}
                      </div>
                      <div className={`truncate text-sm ${thread.unread ? 'text-foreground' : 'text-muted-foreground'}`}>{thread.lastMessage}</div>
                    </div>
                    <div className="ml-4 text-xs text-muted-foreground whitespace-nowrap">{thread.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Chat view */}
            <div className="flex-1 flex flex-col h-full">
              {selectedThreadId ? (
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b flex items-center gap-2">
                    <Typography.H2 className="text-lg flex-1">
                      {threads.find(t => t.id === selectedThreadId)?.name}
                    </Typography.H2>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                    {messages[selectedThreadId]?.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-lg px-4 py-2 max-w-xs shadow text-sm ${msg.sender === 'You' ? 'bg-primary text-white' : 'bg-card border'}`}>
                          <div className="mb-1 font-medium text-xs text-muted-foreground">{msg.sender}</div>
                          <div>{msg.content}</div>
                          <div className="text-xs text-muted-foreground mt-1 text-right">{msg.timestamp}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form
                    className="p-4 border-t flex gap-2 bg-card"
                    onSubmit={e => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                  >
                    <input
                      className="flex-1 rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-primary"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={e => setMessageInput(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded font-medium hover:bg-primary/90 transition"
                      disabled={!messageInput.trim()}
                    >
                      Send
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <span>Select a conversation to start chatting</span>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage; 