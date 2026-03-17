import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  LogOut,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {
  addApplicationNote,
  getChecklistProgress,
  getPipelineSummary,
  listApplicationNotes,
  listSchoolApplications,
  PIPELINE_STAGES,
  PRIORITY_LABELS,
  STAGE_LABELS,
  updateSchoolApplication,
} from '../lib/pipeline';

const stagePillStyles = {
  lead: 'bg-slate-100 text-slate-700',
  principal_authorization: 'bg-amber-100 text-amber-700',
  documents_pending: 'bg-orange-100 text-orange-700',
  domain_setup: 'bg-blue-100 text-blue-700',
  workspace_setup: 'bg-indigo-100 text-indigo-700',
  teacher_training: 'bg-violet-100 text-violet-700',
  handoff: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-emerald-100 text-emerald-700',
  blocked: 'bg-rose-100 text-rose-700',
};

const priorityStyles = {
  high: 'bg-rose-50 text-rose-700 border-rose-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const MetricCard = ({ icon: Icon, label, value, hint }) => (
  <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
    <Icon className="w-5 h-5 text-slate-500 mb-4" />
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <p className="text-3xl font-semibold tracking-tight text-slate-900 mt-2">{value}</p>
    <p className="text-sm text-slate-500 mt-2">{hint}</p>
  </div>
);

const StagePill = ({ stage }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${stagePillStyles[stage] || stagePillStyles.lead}`}>
    {STAGE_LABELS[stage] || stage}
  </span>
);

const PriorityPill = ({ priority }) => (
  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyles[priority] || priorityStyles.medium}`}>
    {PRIORITY_LABELS[priority] || priority}
  </span>
);

export const DashboardPage = () => {
  const { logout, profile } = useAuth();
  const [applications, setApplications] = useState([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [noteSaving, setNoteSaving] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');

  const loadApplications = useCallback(async (preferredSelectionId = null) => {
    setLoading(true);
    setError('');

    try {
      const data = await listSchoolApplications();
      setApplications(data);

      const selectionId = preferredSelectionId || data[0]?.id || null;
      setSelectedApplicationId(selectionId);
      setSelectedDraft(data.find((item) => item.id === selectionId) || null);
    } catch (loadError) {
      setError(loadError.message || 'Unable to load the onboarding pipeline.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  useEffect(() => {
    if (!selectedApplicationId) {
      setNotes([]);
      return;
    }

    const loadNotes = async () => {
      try {
        const data = await listApplicationNotes(selectedApplicationId);
        setNotes(data);
      } catch (noteError) {
        setError(noteError.message || 'Unable to load notes for this school.');
      }
    };

    loadNotes();
  }, [selectedApplicationId]);

  const selectedApplication = useMemo(
    () => applications.find((item) => item.id === selectedApplicationId) || null,
    [applications, selectedApplicationId]
  );

  useEffect(() => {
    setSelectedDraft(selectedApplication);
  }, [selectedApplication]);

  const filteredApplications = useMemo(() => {
    return applications.filter((item) => {
      const matchesStage = stageFilter === 'all' || item.pipeline_stage === stageFilter;
      const haystack = [
        item.school_name,
        item.district,
        item.principal_name,
        item.poc_name,
        item.board_affiliation,
      ]
        .join(' ')
        .toLowerCase();

      return matchesStage && haystack.includes(query.trim().toLowerCase());
    });
  }, [applications, query, stageFilter]);

  const summary = useMemo(() => getPipelineSummary(applications), [applications]);
  const checklistProgress = selectedApplication ? getChecklistProgress(selectedApplication) : null;

  const handleSave = async () => {
    if (!selectedDraft?.id) {
      return;
    }

    setSaving(true);
    setError('');

    try {
      const updated = await updateSchoolApplication(selectedDraft.id, selectedDraft);
      await loadApplications(updated?.id || selectedDraft.id);
    } catch (saveError) {
      setError(saveError.message || 'Unable to save this school record.');
    } finally {
      setSaving(false);
    }
  };

  const handleAssignToMe = () => {
    setSelectedDraft((current) =>
      current
        ? {
            ...current,
            assigned_to: profile?.id || null,
            assigned_to_name: profile?.name || profile?.full_name || profile?.email || '',
          }
        : current
    );
  };

  const handleAddNote = async () => {
    if (!selectedApplication || !newNote.trim()) {
      return;
    }

    setNoteSaving(true);
    setError('');

    try {
      await addApplicationNote({
        applicationId: selectedApplication.id,
        body: newNote,
        author: profile,
      });

      const refreshedNotes = await listApplicationNotes(selectedApplication.id);
      setNotes(refreshedNotes);
      setNewNote('');
      await loadApplications(selectedApplication.id);
    } catch (noteError) {
      setError(noteError.message || 'Unable to save note.');
    } finally {
      setNoteSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-sm text-slate-600 shadow-sm mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Onboarding pipeline
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.05]">
              Working v1 for school onboarding.
            </h1>
            <p className="text-slate-600 text-lg max-w-3xl mt-4 leading-relaxed">
              One place to move a school from intake to principal approval, document readiness, domain setup, teacher training, and handoff.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-slate-600">
              Signed in as <span className="font-semibold text-slate-900">{profile?.name || profile?.email}</span>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-white px-5 py-3 font-medium hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard icon={ClipboardList} label="Schools in pipeline" value={summary.total} hint="All leads and active onboarding records." />
          <MetricCard icon={Sparkles} label="Active setups" value={summary.active} hint="Everything not completed or blocked." />
          <MetricCard icon={CheckCircle2} label="Completed" value={summary.completed} hint="Schools fully handed off." />
          <MetricCard icon={CalendarClock} label="Due in 3 days" value={summary.dueSoon} hint="Records that need action soon." />
        </div>

        <div className="grid xl:grid-cols-[0.88fr_1.12fr] gap-6 items-start">
          <section className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-[28px] shadow-sm p-6">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <label className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search school, principal, or district"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                  />
                </label>
                <select
                  value={stageFilter}
                  onChange={(event) => setStageFilter(event.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                >
                  <option value="all">All stages</option>
                  {PIPELINE_STAGES.map((stage) => (
                    <option key={stage} value={stage}>
                      {STAGE_LABELS[stage]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {PIPELINE_STAGES.map((stage) => (
                  <div key={stage} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    {STAGE_LABELS[stage]}: <span className="font-semibold text-slate-900">{summary.countsByStage[stage]}</span>
                  </div>
                ))}
              </div>

              {loading ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center text-slate-500">
                  Loading schools...
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center text-slate-500">
                  No schools match your current filters.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredApplications.map((application) => {
                    const isSelected = application.id === selectedApplicationId;
                    const progress = getChecklistProgress(application);

                    return (
                      <button
                        key={application.id}
                        onClick={() => setSelectedApplicationId(application.id)}
                        className={`w-full text-left rounded-[24px] border p-5 transition-all ${
                          isSelected
                            ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-300/50'
                            : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <p className={`text-xs uppercase tracking-[0.22em] font-semibold ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                              {application.board_affiliation || 'Board not set'}
                            </p>
                            <h3 className={`text-xl font-semibold mt-2 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                              {application.school_name}
                            </h3>
                            <p className={`text-sm mt-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                              {application.principal_name} • {application.district}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <StagePill stage={application.pipeline_stage} />
                            <PriorityPill priority={application.priority} />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div className={isSelected ? 'text-slate-200' : 'text-slate-600'}>
                            <p><span className="font-medium">POC:</span> {application.poc_name || 'Not set'}</p>
                            <p><span className="font-medium">Suite:</span> {application.suite_preference}</p>
                          </div>
                          <div className={isSelected ? 'text-slate-200' : 'text-slate-600'}>
                            <p><span className="font-medium">Checklist:</span> {progress.complete}/{progress.total}</p>
                            <p><span className="font-medium">Due:</span> {application.next_action_due || 'Not scheduled'}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          <section className="space-y-5">
            {selectedDraft ? (
              <>
                <div className="bg-white border border-slate-200 rounded-[28px] shadow-sm p-6 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-slate-400 font-semibold mb-2">
                        {selectedDraft.board_affiliation || 'Board not set'}
                      </p>
                      <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                        {selectedDraft.school_name}
                      </h2>
                      <p className="text-slate-600 mt-3">
                        {selectedDraft.school_type || 'School type not set'} • {selectedDraft.district}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <StagePill stage={selectedDraft.pipeline_stage} />
                      <PriorityPill priority={selectedDraft.priority} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-6">
                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold mb-3">Primary contacts</p>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p><span className="font-medium text-slate-900">Principal:</span> {selectedDraft.principal_name}</p>
                        <p>{selectedDraft.principal_email || 'No email provided'}</p>
                        <p>{selectedDraft.principal_phone || 'No phone provided'}</p>
                        <p className="pt-2"><span className="font-medium text-slate-900">POC:</span> {selectedDraft.poc_name}</p>
                        <p>{selectedDraft.poc_role || 'Role not set'}</p>
                        <p>{selectedDraft.poc_email || 'No email provided'}</p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold mb-3">Readiness snapshot</p>
                      <div className="space-y-3 text-sm text-slate-600">
                        <p><span className="font-medium text-slate-900">Website:</span> {selectedDraft.website_url || 'Not provided'}</p>
                        <p><span className="font-medium text-slate-900">Domain:</span> {selectedDraft.domain_name || 'No domain yet'}</p>
                        <p><span className="font-medium text-slate-900">Internet:</span> {selectedDraft.internet_status}</p>
                        <p><span className="font-medium text-slate-900">Devices:</span> {selectedDraft.device_count || 'Unknown'}</p>
                        <p><span className="font-medium text-slate-900">Checklist:</span> {checklistProgress?.complete}/{checklistProgress?.total}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-6">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-600 mb-2">Pipeline stage</span>
                      <select
                        value={selectedDraft.pipeline_stage}
                        onChange={(event) => setSelectedDraft((current) => ({ ...current, pipeline_stage: event.target.value }))}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                      >
                        {PIPELINE_STAGES.map((stage) => (
                          <option key={stage} value={stage}>
                            {STAGE_LABELS[stage]}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="block text-sm font-medium text-slate-600 mb-2">Priority</span>
                      <select
                        value={selectedDraft.priority}
                        onChange={(event) => setSelectedDraft((current) => ({ ...current, priority: event.target.value }))}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                      >
                        {Object.keys(PRIORITY_LABELS).map((priority) => (
                          <option key={priority} value={priority}>
                            {PRIORITY_LABELS[priority]}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="block text-sm font-medium text-slate-600 mb-2">Next action</span>
                      <input
                        value={selectedDraft.next_action || ''}
                        onChange={(event) => setSelectedDraft((current) => ({ ...current, next_action: event.target.value }))}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                      />
                    </label>

                    <label className="block">
                      <span className="block text-sm font-medium text-slate-600 mb-2">Due date</span>
                      <input
                        type="date"
                        value={selectedDraft.next_action_due || ''}
                        onChange={(event) => setSelectedDraft((current) => ({ ...current, next_action_due: event.target.value }))}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                      />
                    </label>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3 mb-6">
                    {[
                      ['principal_authorization_ready', 'Principal approval ready'],
                      ['registration_certificate_ready', 'Registration certificate ready'],
                      ['dns_access_ready', 'DNS access identified'],
                    ].map(([field, label]) => (
                      <label key={field} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedDraft[field] || false}
                          onChange={(event) => setSelectedDraft((current) => ({ ...current, [field]: event.target.checked }))}
                          className="mt-1 h-4 w-4 rounded border-slate-300"
                        />
                        <span className="text-sm text-slate-700">{label}</span>
                      </label>
                    ))}
                  </div>

                  <label className="block mb-6">
                    <span className="block text-sm font-medium text-slate-600 mb-2">Implementation notes</span>
                    <textarea
                      value={selectedDraft.implementation_notes || ''}
                      onChange={(event) => setSelectedDraft((current) => ({ ...current, implementation_notes: event.target.value }))}
                      className="w-full min-h-[130px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    />
                  </label>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm text-slate-500">
                      Assigned to: <span className="font-medium text-slate-900">{selectedDraft.assigned_to_name || 'Nobody yet'}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={handleAssignToMe} type="button" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        Assign to me
                      </button>
                      <button onClick={handleSave} type="button" disabled={saving} className="rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-slate-800 disabled:opacity-70 transition-colors">
                        {saving ? 'Saving...' : 'Save record'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-[28px] shadow-sm p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <GraduationCap className="w-5 h-5 text-slate-500" />
                    <h3 className="text-xl font-semibold text-slate-900">Operator notes</h3>
                  </div>

                  <div className="space-y-3 mb-5">
                    {notes.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-slate-500">
                        No notes yet for this school.
                      </div>
                    ) : (
                      notes.map((note) => (
                        <div key={note.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                            <p className="text-sm font-medium text-slate-900">{note.author_name || 'Operator'}</p>
                            <p className="text-xs text-slate-500">{new Date(note.created_at).toLocaleString()}</p>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{note.body}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <label className="block">
                    <span className="block text-sm font-medium text-slate-600 mb-2">Add note</span>
                    <textarea
                      value={newNote}
                      onChange={(event) => setNewNote(event.target.value)}
                      placeholder="Capture a call outcome, risk, blocker, or next action."
                      className="w-full min-h-[120px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    />
                  </label>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleAddNote}
                      type="button"
                      disabled={noteSaving || !newNote.trim()}
                      className="rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-slate-800 disabled:opacity-60 transition-colors"
                    >
                      {noteSaving ? 'Saving note...' : 'Add note'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white border border-dashed border-slate-200 rounded-[28px] px-6 py-20 text-center text-slate-500 shadow-sm">
                Select a school from the left to view and update its onboarding record.
              </div>
            )}
          </section>
        </div>

        {error ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl px-5 py-4 text-sm text-rose-700 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
};
