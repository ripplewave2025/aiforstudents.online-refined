import { isSupabaseConfigured, supabase } from './supabase';

const APPLICATIONS_STORAGE_KEY = 'ais_pipeline_applications_v1';
const NOTES_STORAGE_KEY = 'ais_pipeline_notes_v1';

export const PIPELINE_STAGES = [
  'lead',
  'principal_authorization',
  'documents_pending',
  'domain_setup',
  'workspace_setup',
  'teacher_training',
  'handoff',
  'completed',
  'blocked',
];

export const STAGE_LABELS = {
  lead: 'New Lead',
  principal_authorization: 'Principal Authorization',
  documents_pending: 'Documents Pending',
  domain_setup: 'Domain + DNS',
  workspace_setup: 'Workspace Setup',
  teacher_training: 'Teacher Training',
  handoff: 'Handoff',
  completed: 'Completed',
  blocked: 'Blocked',
};

export const PRIORITY_LABELS = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const seedApplications = [
  {
    id: 'demo-app-1',
    school_name: 'Lamahatta Learning Centre',
    district: 'Darjeeling',
    board_affiliation: 'WBBSE',
    school_type: 'Government',
    student_count: 214,
    teacher_count: 12,
    principal_name: 'Mina Subba',
    principal_email: 'mina.subba@lamahatta.edu',
    principal_phone: '+91 98320 11111',
    poc_name: 'Nima Lepcha',
    poc_role: 'Teacher Champion',
    poc_email: 'nima.lepcha@lamahatta.edu',
    poc_phone: '+91 98320 11112',
    website_url: '',
    domain_name: '',
    suite_preference: 'google',
    internet_status: 'mobile',
    device_count: 4,
    principal_authorization_ready: true,
    registration_certificate_ready: true,
    dns_access_ready: false,
    current_tools: 'Uses WhatsApp and personal Gmail for notices.',
    implementation_notes: 'Need to collect registrar details from district office.',
    next_action: 'Call principal and confirm DNS owner.',
    next_action_due: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    pipeline_stage: 'documents_pending',
    priority: 'high',
    assigned_to: null,
    assigned_to_name: '',
    source: 'manual_seed',
    submitted_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'demo-app-2',
    school_name: 'Mirik Valley Public School',
    district: 'Darjeeling',
    board_affiliation: 'CBSE',
    school_type: 'Private',
    student_count: 468,
    teacher_count: 23,
    principal_name: 'R. Chhetri',
    principal_email: 'principal@mirikvalley.org',
    principal_phone: '+91 98320 22221',
    poc_name: 'Anita Rai',
    poc_role: 'IT Coordinator',
    poc_email: 'anita@mirikvalley.org',
    poc_phone: '+91 98320 22222',
    website_url: 'https://mirikvalley.org',
    domain_name: 'mirikvalley.org',
    suite_preference: 'either',
    internet_status: 'broadband',
    device_count: 25,
    principal_authorization_ready: true,
    registration_certificate_ready: true,
    dns_access_ready: true,
    current_tools: 'Already using a shared domain mailbox with limited classroom tooling.',
    implementation_notes: 'Candidate for fastest case study.',
    next_action: 'Submit Google Workspace eligibility docs.',
    next_action_due: new Date(Date.now() + 1 * 86400000).toISOString().slice(0, 10),
    pipeline_stage: 'domain_setup',
    priority: 'medium',
    assigned_to: null,
    assigned_to_name: '',
    source: 'website_form',
    submitted_at: new Date(Date.now() - 9 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'demo-app-3',
    school_name: 'Bagdogra Girls High School',
    district: 'Darjeeling',
    board_affiliation: 'WBCHSE',
    school_type: 'Government Aided',
    student_count: 389,
    teacher_count: 19,
    principal_name: 'Soma Roy',
    principal_email: 'soma.roy@bagdogra-ghs.in',
    principal_phone: '+91 98320 33331',
    poc_name: 'Prakash Tamang',
    poc_role: 'Assistant Teacher',
    poc_email: 'prakash@bagdogra-ghs.in',
    poc_phone: '+91 98320 33332',
    website_url: 'https://bagdogra-ghs.in',
    domain_name: 'bagdogra-ghs.in',
    suite_preference: 'microsoft',
    internet_status: 'mixed',
    device_count: 12,
    principal_authorization_ready: true,
    registration_certificate_ready: true,
    dns_access_ready: true,
    current_tools: 'Teachers need onboarding on Teams and classroom workflows.',
    implementation_notes: 'Training dates pending board exam schedule.',
    next_action: 'Lock teacher training date with school POC.',
    next_action_due: new Date(Date.now() + 4 * 86400000).toISOString().slice(0, 10),
    pipeline_stage: 'teacher_training',
    priority: 'medium',
    assigned_to: null,
    assigned_to_name: '',
    source: 'referral',
    submitted_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
];

const seedNotes = [
  {
    id: 'demo-note-1',
    application_id: 'demo-app-1',
    author_id: 'admin-demo-1',
    author_name: 'Program Admin',
    body: 'Principal already approved the pilot verbally. Waiting for signed authorization letter.',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'demo-note-2',
    application_id: 'demo-app-2',
    author_id: 'operator-demo-1',
    author_name: 'Pipeline Operator',
    body: 'Website is live and domain access is confirmed. Fast-track this school into setup.',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

const nowIso = () => new Date().toISOString();

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

const readStorage = (key, fallback) => {
  const saved = localStorage.getItem(key);

  if (!saved) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }

  return JSON.parse(saved);
};

const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const normalizeApplication = (payload) => ({
  school_name: payload.school_name?.trim() || '',
  district: payload.district?.trim() || 'Darjeeling',
  board_affiliation: payload.board_affiliation?.trim() || '',
  school_type: payload.school_type?.trim() || '',
  student_count: payload.student_count ? Number(payload.student_count) : null,
  teacher_count: payload.teacher_count ? Number(payload.teacher_count) : null,
  principal_name: payload.principal_name?.trim() || '',
  principal_email: payload.principal_email?.trim() || '',
  principal_phone: payload.principal_phone?.trim() || '',
  poc_name: payload.poc_name?.trim() || '',
  poc_role: payload.poc_role?.trim() || '',
  poc_email: payload.poc_email?.trim() || '',
  poc_phone: payload.poc_phone?.trim() || '',
  website_url: payload.website_url?.trim() || '',
  domain_name: payload.domain_name?.trim() || '',
  suite_preference: payload.suite_preference || 'either',
  internet_status: payload.internet_status || 'not_sure',
  device_count: payload.device_count ? Number(payload.device_count) : null,
  principal_authorization_ready: !!payload.principal_authorization_ready,
  registration_certificate_ready: !!payload.registration_certificate_ready,
  dns_access_ready: !!payload.dns_access_ready,
  current_tools: payload.current_tools?.trim() || '',
  implementation_notes: payload.implementation_notes?.trim() || '',
  next_action: payload.next_action?.trim() || '',
  next_action_due: payload.next_action_due || null,
  pipeline_stage: payload.pipeline_stage || 'lead',
  priority: payload.priority || 'medium',
  assigned_to: payload.assigned_to || null,
  assigned_to_name: payload.assigned_to_name || '',
  source: payload.source || 'website_form',
});

export const getChecklistProgress = (application) => {
  const total = 3;
  const complete = [
    application.principal_authorization_ready,
    application.registration_certificate_ready,
    application.dns_access_ready,
  ].filter(Boolean).length;

  return { complete, total, ratio: complete / total };
};

export const getPipelineSummary = (applications) => {
  const activeStages = applications.filter((item) => !['completed', 'blocked'].includes(item.pipeline_stage));
  const dueSoon = applications.filter((item) => {
    if (!item.next_action_due) {
      return false;
    }

    const dueDate = new Date(item.next_action_due);
    const today = new Date();
    const diff = (dueDate - today) / 86400000;
    return diff <= 3;
  });

  const countsByStage = PIPELINE_STAGES.reduce((accumulator, stage) => {
    accumulator[stage] = applications.filter((item) => item.pipeline_stage === stage).length;
    return accumulator;
  }, {});

  return {
    total: applications.length,
    active: activeStages.length,
    completed: countsByStage.completed,
    blocked: countsByStage.blocked,
    dueSoon: dueSoon.length,
    countsByStage,
  };
};

export const listSchoolApplications = async () => {
  if (!isSupabaseConfigured || !supabase) {
    const local = readStorage(APPLICATIONS_STORAGE_KEY, seedApplications);
    return [...local].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }

  const { data, error } = await supabase
    .from('school_applications')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
};

export const createSchoolApplication = async (payload) => {
  const normalized = {
    ...normalizeApplication(payload),
    submitted_at: nowIso(),
    updated_at: nowIso(),
  };

  if (!isSupabaseConfigured || !supabase) {
    const existing = readStorage(APPLICATIONS_STORAGE_KEY, seedApplications);
    const created = {
      id: createId(),
      ...normalized,
    };
    writeStorage(APPLICATIONS_STORAGE_KEY, [created, ...existing]);
    return created;
  }

  const { data, error } = await supabase
    .from('school_applications')
    .insert(normalized)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateSchoolApplication = async (applicationId, updates) => {
  const normalizedUpdates = {
    ...normalizeApplication(updates),
    updated_at: nowIso(),
  };

  if (!isSupabaseConfigured || !supabase) {
    const existing = readStorage(APPLICATIONS_STORAGE_KEY, seedApplications);
    const updated = existing.map((item) =>
      item.id === applicationId ? { ...item, ...normalizedUpdates } : item
    );
    writeStorage(APPLICATIONS_STORAGE_KEY, updated);
    return updated.find((item) => item.id === applicationId) || null;
  }

  const { data, error } = await supabase
    .from('school_applications')
    .update(normalizedUpdates)
    .eq('id', applicationId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const listApplicationNotes = async (applicationId) => {
  if (!isSupabaseConfigured || !supabase) {
    return readStorage(NOTES_STORAGE_KEY, seedNotes)
      .filter((note) => note.application_id === applicationId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  const { data, error } = await supabase
    .from('application_notes')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
};

export const addApplicationNote = async ({ applicationId, body, author }) => {
  const note = {
    application_id: applicationId,
    author_id: author?.id || null,
    author_name: author?.name || author?.full_name || author?.email || 'Operator',
    body: body.trim(),
    created_at: nowIso(),
  };

  if (!isSupabaseConfigured || !supabase) {
    const existing = readStorage(NOTES_STORAGE_KEY, seedNotes);
    const created = { id: createId(), ...note };
    writeStorage(NOTES_STORAGE_KEY, [created, ...existing]);

    const applications = readStorage(APPLICATIONS_STORAGE_KEY, seedApplications).map((item) =>
      item.id === applicationId ? { ...item, updated_at: nowIso() } : item
    );
    writeStorage(APPLICATIONS_STORAGE_KEY, applications);

    return created;
  }

  const { data, error } = await supabase
    .from('application_notes')
    .insert(note)
    .select()
    .single();

  if (error) {
    throw error;
  }

  await supabase
    .from('school_applications')
    .update({ updated_at: nowIso() })
    .eq('id', applicationId);

  return data;
};
