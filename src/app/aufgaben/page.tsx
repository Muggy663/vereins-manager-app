"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Plus, Calendar, Users, AlertTriangle, Clock, FileText } from 'lucide-react';

export default function AufgabenPage() {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Jahreshauptversammlung vorbereiten',
      description: 'Einladungen versenden, Tagesordnung erstellen, Raum buchen',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'Max Mustermann',
      dueDate: '2024-03-15',
      progress: 60,
      category: 'vorstand',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'SEPA-Lastschriften für 2024 erstellen',
      description: 'Alle Mitgliedsbeiträge für das neue Jahr einziehen',
      priority: 'medium',
      status: 'todo',
      assignedTo: 'Anna Schmidt',
      dueDate: '2024-02-01',
      progress: 0,
      category: 'finanzen',
      createdAt: '2024-01-05'
    },
    {
      id: '3',
      title: 'Schießstand-Wartung organisieren',
      description: 'Jährliche Wartung der Lüftungsanlage und Kugelfänge',
      priority: 'high',
      status: 'completed',
      assignedTo: 'Peter Fischer',
      dueDate: '2024-01-30',
      progress: 100,
      category: 'technik',
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      title: 'Jugendtraining planen',
      description: 'Trainingszeiten für neue Saison festlegen',
      priority: 'medium',
      status: 'todo',
      assignedTo: 'Lisa Wagner',
      dueDate: '2024-02-15',
      progress: 25,
      category: 'jugend',
      createdAt: '2024-01-12'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('alle');
  const [filterPriority, setFilterPriority] = useState('alle');

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'alle' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'alle' || task.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in_progress': return 'secondary';
      case 'todo': return 'outline';
      default: return 'outline';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vorstand': return '👔';
      case 'finanzen': return '💰';
      case 'technik': return '🔧';
      case 'jugend': return '👶';
      case 'events': return '📅';
      default: return '📋';
    }
  };

  return (
    <div className="w-full px-2 md:px-4 py-4 md:py-8">
      <div className="mb-4 md:mb-8">
        <div className="flex items-center mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.history.back()}
            className="mr-4"
          >
            ← Zurück
          </Button>
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-primary">📋 Aufgaben-Management</h1>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
          To-Do-Listen für den Vorstand und Vereinsorganisation
        </p>
      </div>

      {/* Statistiken */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-sm text-gray-600">Gesamt</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">{stats.todo}</div>
            <p className="text-sm text-gray-600">Offen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
            <p className="text-sm text-gray-600">In Arbeit</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-sm text-gray-600">Erledigt</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <p className="text-sm text-gray-600">Überfällig</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter und Aktionen */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="alle">Alle Status</option>
              <option value="todo">Offen</option>
              <option value="in_progress">In Arbeit</option>
              <option value="completed">Erledigt</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="alle">Alle Prioritäten</option>
              <option value="high">Hoch</option>
              <option value="medium">Mittel</option>
              <option value="low">Niedrig</option>
            </select>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Neue Aufgabe
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Aufgabenliste */}
      <Card>
        <CardHeader>
          <CardTitle>Aufgaben ({filteredTasks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.map(task => (
              <Card key={task.id} className="border">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{getCategoryIcon(task.category)}</span>
                      <div>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority === 'high' ? 'Hoch' : task.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                      </Badge>
                      <Badge variant={getStatusColor(task.status)}>
                        {task.status === 'completed' ? 'Erledigt' : 
                         task.status === 'in_progress' ? 'In Arbeit' : 'Offen'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Zuständig:</span>
                      <span className="ml-2 font-medium">{task.assignedTo}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fällig:</span>
                      <span className="ml-2 font-medium">
                        {new Date(task.dueDate).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fortschritt:</span>
                      <span className="ml-2 font-medium">{task.progress}%</span>
                    </div>
                  </div>
                  
                  {task.progress > 0 && task.progress < 100 && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature-Ideen */}
      <div className="mt-8 space-y-6">
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">📋 Vereinsorganisation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <h4 className="font-semibold mb-2">🏛️ Vorstandsarbeit:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>JHV-Checkliste automatisch generieren</li>
                  <li>Vorstandssitzungen planen & protokollieren</li>
                  <li>Wahlen vorbereiten & durchführen</li>
                  <li>Satzungsänderungen verwalten</li>
                  <li>Vereinsregister-Anmeldungen</li>
                  <li>Gemeinnützigkeits-Nachweise</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💰 Finanzen & Verwaltung:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Kassenprüfung vorbereiten</li>
                  <li>SEPA-Mandate aktualisieren</li>
                  <li>Beitragsbeschlüsse umsetzen</li>
                  <li>Versicherungen prüfen</li>
                  <li>Steuererklärung vorbereiten</li>
                  <li>Förderanträge stellen</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">🎯 Schießsport-spezifisch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h4 className="font-semibold mb-2">🔒 Sicherheit & Recht:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Waffenrechtliche Kontrollen organisieren</li>
                  <li>Sicherheitsbelehrungen durchführen</li>
                  <li>Standaufsichts-Dienstpläne erstellen</li>
                  <li>Munitionsinventur durchführen</li>
                  <li>Unfallmeldungen bearbeiten</li>
                  <li>Behördliche Prüfungen vorbereiten</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🏢 Schießstand & Technik:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Wartung Lüftungsanlage planen</li>
                  <li>Kugelfang-Kontrolle organisieren</li>
                  <li>Beleuchtung & Elektronik prüfen</li>
                  <li>Reinigungspläne erstellen</li>
                  <li>Reparaturen koordinieren</li>
                  <li>TÜV-Termine vereinbaren</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">🎉 Events & Gemeinschaft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
              <div>
                <h4 className="font-semibold mb-2">🎆 Vereinsfeste:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Schützenfest organisieren</li>
                  <li>Königsschießen planen</li>
                  <li>Weihnachtsfeier vorbereiten</li>
                  <li>Vereinsausflüge organisieren</li>
                  <li>Grillabende & gesellige Runden</li>
                  <li>Ehrungen & Jubiläen planen</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🏆 Wettkämpfe & Sport:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Vereinsmeisterschaften ausrichten</li>
                  <li>Ligawettkämpfe koordinieren</li>
                  <li>Pokalturniere organisieren</li>
                  <li>Jugendwettkämpfe betreuen</li>
                  <li>Gastvereine einladen</li>
                  <li>Schiedsrichter organisieren</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">🚀 Digitale Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-700">
              <div>
                <h4 className="font-semibold mb-2">📱 Smart Management:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Kalender-Integration mit Erinnerungen</li>
                  <li>Team-Aufgaben mit Kommentaren</li>
                  <li>Automatische Eskalation bei Verzögerung</li>
                  <li>Zeiterfassung für Ehrenamt-Nachweis</li>
                  <li>Mobile Push-Benachrichtigungen</li>
                  <li>Foto-Dokumentation von Fortschritten</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🤖 Automatisierung:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Wiederkehrende Aufgaben automatisch erstellen</li>
                  <li>Vorlagen für Standard-Prozesse</li>
                  <li>Workflow-Automation (z.B. JHV-Ablauf)</li>
                  <li>Integration mit E-Mail & Kalender</li>
                  <li>Berichts-Generator für Vorstand</li>
                  <li>KI-basierte Aufgaben-Priorisierung</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}