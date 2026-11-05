// WHS WebView app code. Kept out of index.html so the page's security policy can block inline scripts.
const CONTAINER = "iCloud.com.davidgoncalvespersonalteam.UntitledProject";
const PASS_TYPE = "WHSTeacherPass";
const NEWS_TYPE = "WHSAnnouncement";
const CAMPUS_TYPE = "WHSCampusLog";
const CAMPUS_LOG = "whs-campus-log";
const CAMPUS_CLEARED = "whs-campus-cleared";
// Staff-only list of passes that fell off the 500-entry log (written by the iPhone app).
const CAMPUS_ARCHIVE = "whs-campus-archive";
const MANIFEST = "whs-teacher-pass-manifest";
const CLEARED = "whs-cleared-passes";
const NEWS_MANIFEST = "whs-news-manifest";
const LUNCH = "./WHSLunchMenu.pdf?v=2026-11";
const copy = {
  en: {
    welcome: "Welcome",
    gateBody: "Pair your iPhone App via Account -> WHS Web Code",
    codeLabel: "WHS Web Code",
    enter: "Sign In",
    skip: "Sign In",
    guestTitle: "Don't use an iPhone?",
    guestBody: "Setup WHS WebView portal and homescreen shortcut",
    nameLabel: "Name",
    gradeLabel: "Grade",
    guestNeedInfo: "Enter your name and grade.",
    guestNeedRole: "Choose student, teacher, or administrator.",
    guestNeedStaff: "Enter your name and the staff access code.",
    appleStepTitle: "Sign in with Apple",
    appleStepBody: "Staff uses the same Apple ID as on iPhone. Sign in to finish.",
    appleSignOutFirst: "This browser is still signed in. Sign out, then sign in with your Apple ID.",
    appleButtonMissing: "The Apple button did not load. Reload this page and try again.",
    appleNoSchool: "The school connection did not load. Reload this page.",
    appleSignLabel: "Apple ID",
    appleSignedIn: "Signed in with Apple",
    staffAppleFail: "Signed in, but WHS could not save staff access. Tap Sign in with Apple again.",
    staffNotListed: "This Apple ID is not on the staff list yet. Send this ID to your WHS admin:",
    staffCopyId: "Copy ID",
    staffRoleRetry: "Couldn't confirm your staff role. Try again.",
    staffCodeWrong: "That access code is not correct.",
    issuePassNeedStaff: "This Apple ID is not enrolled as staff.",
    staffCodeLabel: "Staff access code",
    roleStudent: "Student",
    roleTeacher: "Teacher",
    gateHint: "",
    useCode: "Use my WHS Web Code",
    webCodeTitle: "WHS Web Code",
    webCodeGuestHint: "Show this to a teacher so they can issue a hallway or Flex pass to this device.",
    webCodeCopy: "Copy code",
    webCodeShow: "Show code",
    webCodeHide: "Hide code",
    webCodeHiddenLabel: "WHS Web Code hidden",
    webCodeReset: "Reset web code",
    webCodeResetTitle: "Reset your WHS Web Code?",
    webCodeResetBody: "Use this if someone else saw your code. You get a new code and the old one stops working. Passes sent to the old code won't show here anymore.",
    webCodeResetConfirm: "Reset code",
    webCodeResetCancel: "Keep my code",
    webCodeResetWorking: "Making your new code…",
    webCodeResetNeedApple: "Sign in with Apple in this browser first, then reset your code.",
    webCodeResetFail: "Your code wasn't changed. Check your connection and try again.",
    webCodeCopied: "Copied",
    webCodeSaveFail: "Could not save your web code. Check the school connection and try again.",
    addHome: "Add to Home Screen",
    addHomeSub: "Open WHS as its own app, without the browser bar",
    addHomeOnDevice: "WHS is on this Home Screen",
    addHomeOnDeviceSub: "Open the WHS icon like an app.",
    addHomeTitle: "Add WHS to Home Screen",
    addHomeIPhone: "On iPhone or iPad: tap Share, then Add to Home Screen.",
    addHomeAndroid: "On Android: tap the browser menu, then Install app or Add to Home screen.",
    addHomeChrome: "On a Chromebook: open the Chrome menu, then Install WHS, or Create shortcut and turn on Open as window.",
    addHomeInstall: "Install WHS",
    gateFail: "Could not find that code. Check the letters. Open the iPhone app so it can save your code, then try again.",
    dashStudent: "Your device dashboard. Swipe Card, classes, and accepted hallway and Flex passes sync from your iPhone with this web code.",
    yourPasses: "Your passes",
    noneYet: "No passes yet",
    noStudentPasses: "No passes saved on this device. Accept a pass, then reload.",
    signature: "TEACHER'S SIGNATURE",
    studentNameLabel: "STUDENT NAME",
    destinationLabel: "DESTINATION",
    datesLabel: "DATE(S)",
    dashTeacher: "Teacher dashboard. The campus pass log matches the administrator log. Issue a Pass here if you do not have an iPhone.",
    dashParent: "Parent dashboard. News is the bell. Staff is in Contacts.",
    dashAdmin: "Administrator dashboard. The campus pass log is here. Students do not see it.",
    openLunch: "WHS Lunch",
    openNews: "School news",
    lunchMenu: "WHS Lunch",
    wire: "Warrior's Wire",
    wireSub: "Open the school newspaper",
    wireOpen: "Open Warrior's Wire",
    newsFeed: "Notifications",
    alumniTitle: "Alumni Spotlight Submissions Open Now!",
    alumniSubtitle: "Warrior's Wire · Tap to view",
    nthsTitle: "NTHS Applications Open Now!",
    nthsSubtitle: "National Technical Honor Society · Tap to view",
    publishingTitle: "Publishing Fundraiser On Now!",
    publishingSubtitle: "Warrior's Wire · Tap to view",
    openContacts: "Staff directory",
    openPasses: "Campus pass log",
    auditOpen: "Audit log",
    auditTitle: "Audit log",
    auditIntro: "Every time staff view the pass log, issue, revoke, or clear passes.",
    auditSearch: "Search by staff, action, or pass",
    auditLoading: "Loading audit log…",
    auditEmpty: "No audit entries yet.",
    auditMore: "Load more",
    auditPasses: "Passes",
    auditAppleID: "Apple ID",
    auditUnknown: "Unknown staff",
    auditViewLog: "Viewed the pass log",
    auditIssue: "Issued a pass",
    auditRevoke: "Revoked a pass",
    auditClear: "Cleared the pass log",
    auditViewAudit: "Viewed the audit log",
    auditNeedApple: "Sign in with Apple in this browser to see the audit log.",
    auditDenied: "Only administrators can see the audit log.",
    auditNeedIndex: "The audit log isn't searchable yet. In CloudKit Dashboard, add a Sortable index on WHSAuditLog createdTimestamp.",
    auditFail: "Couldn't load the audit log. Check your connection and try again.",
    swipe: "Swipe Card",
    swipeSub: "Add your ID photo to use Swipe",
    noSwipe: "No Swipe Card on this device yet. Add your ID photo in Swipe Card on iPhone, then reload.",
    swipeGuestEmpty: "Add a photo of your student ID to use Swipe on this device.",
    addSwipePhoto: "Add ID photo",
    replaceSwipePhoto: "Replace ID photo",
    passesTile: "Teacher Passes",
    passesSub: "Hallway and Flex",
    issuePass: "Issue a Pass",
    issuePassBody: "Same Hallway and Flex slip as iPhone. It goes to that student’s website and iPhone.",
    issuePassType: "Pass type",
    issuePassStudent: "Student name",
    issuePassDestination: "Destination",
    issuePassDates: "Date(s)",
    issuePassSignature: "Teacher's signature",
    issuePassClearSig: "Clear signature",
    issuePassCode: "Student WHS Web Code",
    issuePassNeedFields: "Add a student name, destination, date, signature, and WHS Web Code.",
    issuePassNeedApple: "Sign in with Apple to send this pass.",
    issuePassFail: "Could not issue that pass.",
    issuePassDone: "Pass sent. The student will see it in Teacher Passes.",
    issuePassBadCode: "Could not find that WHS Web Code.",
    issuePassWorking: "Sending pass",
    issuePassStepSave: "Saving the pass",
    issuePassStepStudent: "Sending it to the student",
    issuePassStepSignature: "Saving the signature",
    news: "News", lunch: "Lunch", contacts: "Contacts", classes: "Classes", more: "More", home: "Home",
    calendar: "Calendar", agenda: "Agenda",
    calendarEmpty: "Open school news for this week.",
    lunchSub: "This week’s menu",
    ask: "Ask WHS", aide: "Warrior's Aide",
    shortcuts: "Shortcuts",
    classesTile: "Classes",
    classesSub: "No classes yet",
    noClasses: "No classes on this device yet. Add a class on iPhone, then reload.",
    noClassesGuest: "No classes on this device yet. Add a class here to open its resources.",
    addClass: "Add a class",
    editClass: "Edit class",
    deleteClass: "Delete class",
    deleteClassTitle: "Delete this class?",
    deleteClassBody: "This class will leave this device. You can add it again later.",
    saveClass: "Save",
    classSubject: "Subject",
    classTeacher: "Teacher",
    classLevel: "Course level",
    classCategory: "Category",
    classRoom: "Room",
    classClassroom: "Classroom link",
    classNeedInfo: "Enter a subject and teacher.",
    catMath: "Math",
    catEnglish: "English",
    catScience: "Science",
    catSpanish: "Spanish",
    catHistory: "History",
    catCTE: "CTE",
    catPublishing: "Publishing",
    levelCP: "College Prep",
    levelHonors: "Honors",
    levelAP: "AP",
    levelECE: "ECE",
    levelDual: "Dual Enrollment",
    levelElective: "Elective",
    resources: "Resources",
    noResources: "No resources for this class yet.",
    classroom: "Go to Classroom",
    openOnPhone: "This one stays on iPhone.",
    studyFolder: "Spanish study folder",
    studyGames: "Study games",
    readySets: "Ready Grammar Sets",
    readyHint: "Play Ready Grammar Sets. Choose a set, then pick the answer.",
    presentTense: "Present tense",
    bootVerbsGame: "Boot verbs",
    serEstarGame: "Ser vs estar",
    preteriteGame: "Preterite",
    aspectGame: "Preterite vs imperfect",
    articlesSet: "Articles",
    numbersSet: "Numbers",
    chooseAnswer: "Choose the answer",
    learnCorrect: "Correct",
    learnIncorrect: "Incorrect",
    continueBtn: "Continue",
    practiceAgain: "Practice again",
    aspectDone: "All sentences done",
    englishQuiz: "Definition Quiz",
    flashcards: "Flashcards",
    quiz: "Quiz",
    tapReveal: "Tap to reveal",
    next: "Next",
    previous: "Previous",
    noWords: "No words in this list yet. Scan them on iPhone, then reload.",
    quizDone: "Quiz complete",
    correct: "Correct",
    classesBody: "Your classes and study lists sync from iPhone with your web code.",
    moreBody: "This device site can show news, lunch, staff, and your ID card. Sending hallway passes, quizzes, and Ask WHS chat stay on iPhone.",
    signOut: "Delete this device profile",
    signOutTitle: "Delete this device profile?",
    signOutBody: "This deletes your name, web code, swipe photo, ID photo, and Apple sign-in from this device, and removes this profile from the school site.",
    signOutCancel: "Keep profile",
    signOutConfirm: "Delete profile",
    signOutCloudSkipped: "This device profile is deleted. The school site copy was not removed because Apple sign-in was not active in this browser. Sign in with Apple on this device and delete the profile again to remove it from the school site.",
    admin: "Administrator",
    adminHint: "CloudKit API token. Students can ignore this. The pass log stays in this menu.",
    token: "CloudKit API token",
    env: "Environment",
    saveToken: "Save token",
    tokenSaved: "Token saved on this device.",
    refresh: "Refresh",
    back: "Back",
    close: "Close",
    emptyPasses: "No passes yet.",
    passSearch: "Student name, destination, or date",
    passSearchEmpty: "No matching passes.",
    passNoDate: "No date",
    revoked: "Revoked",
    revokePass: "Revoke pass",
    revokePassTitle: "Revoke this pass?",
    revokePassBody: "It will leave the student's iPhone and website. It stays in this log as revoked.",
    revokePassFail: "Could not revoke that pass.",
    revokePassNeedApple: "Sign in with Apple to revoke this pass.",
    revokePassDone: "This pass is revoked. The student cannot use it.",
    adminPassWipeTitle: "Clear pass log",
    adminPassWipe: "Revoke all passes and clear the log",
    adminPassWipeBody: "This override revokes every hallway and Flex pass for students, then empties the campus log. Type CLEAR to confirm.",
    adminPassWipeCode: "Type CLEAR",
    adminPassWipeConfirmTitle: "Clear the pass log?",
    adminPassWipeConfirmBody: "Every student pass will be revoked. The campus log will be empty. This cannot be undone.",
    adminPassWipeBadCode: "Type CLEAR to confirm.",
    adminPassWipeNeedApple: "Sign in with Apple to clear the pass log.",
    adminPassWipeDone: "All passes are revoked. The campus log is empty.",
    adminPassWipeFail: "Could not clear the pass log.",
    adminPassWipeCancel: "Cancel",
    adminPassWipeConfirm: "Clear and delete all passes",
    adminPassWipeWorking: "Clearing the pass log",
    adminPassWipeStepCollect: "Finding every hallway and Flex pass",
    adminPassWipeStepRevoke: "Revoking student passes",
    adminPassWipeStepClear: "Removing passes from the campus log",
    adminPassWipeStepEmpty: "Emptying the live pass list",
    adminPassWipeCount: "Pass",
    hallway: "HALLWAY PASS", flex: "FLEX PASS",
    search: "Name, role, or email",
    newsEmpty: "No news yet.",
    newsNeedToken: "News needs the school CloudKit token. An administrator can paste it in More.",
    composeNews: "Create a New Notification Post",
    composeNewsBody: "Students see this in Notifications on the website and iPhone.",
    newsTitleLabel: "Title",
    newsStoryLabel: "Description",
    newsImageLabel: "Image",
    newsPickImage: "Choose image",
    newsPublish: "Publish",
    newsNeedFields: "Add an image, a title, and a description.",
    newsPublishFail: "Could not publish that post.",
    newsPublishNeedApple: "Sign in with Apple to publish this post.",
    newsPublished: "Posted. Students will see it in Notifications.",
    postsNav: "Posts",
    postsList: "Current posts",
    postsEmpty: "No posts yet.",
    deletePost: "Delete",
    deletePostTitle: "Delete this post?",
    deletePostBody: "Students will no longer see it in Notifications on the website or iPhone.",
    deletePostFail: "Could not delete that post.",
    deletePostNeedApple: "Sign in with Apple to delete this post.",
    language: "Language",
    email: "Email",
    idTitle: "Swipe Card",
    school: "Watertown High School",
    role: "Role",
    grade: "Grade",
    guest: "Guest",
    passesHint: "Teachers send Hallway and Flex passes on iPhone. Students accept them there. The administrator log is in More.",
    askTitle: "Ask WHS",
    askPlaceholder: "Lunch, news, a teacher name…",
    askGo: "Ask",
    askEmpty: "Try lunch, news, a teacher name, or attendance.",
    aideTitle: "Warrior's Aide",
    aideBody: "Need a staff email, this week’s lunch, or school news? Use the buttons below. Attendance is whsattendance@watertownps.org.",
    attendance: "Email attendance"
  },
  es: {
    welcome: "Bienvenido",
    gateBody: "Vincula tu app de iPhone en Cuenta -> Código web WHS",
    codeLabel: "Código web WHS",
    enter: "Entrar",
    skip: "Entrar",
    guestTitle: "¿No usas iPhone?",
    guestBody: "Configura el portal WHS WebView y el atajo de inicio",
    nameLabel: "Nombre",
    gradeLabel: "Grado",
    guestNeedInfo: "Escribe tu nombre y grado.",
    guestNeedRole: "Elige estudiante, maestro o administrador.",
    guestNeedStaff: "Escribe tu nombre y el código de acceso del personal.",
    appleStepTitle: "Entra con Apple",
    appleStepBody: "El personal usa el mismo Apple ID que en iPhone. Entra para terminar.",
    appleSignOutFirst: "Este navegador sigue con una sesión. Cierra sesión y entra con tu Apple ID.",
    appleButtonMissing: "El botón de Apple no cargó. Recarga la página e inténtalo de nuevo.",
    appleNoSchool: "La conexión de la escuela no cargó. Recarga la página.",
    appleSignLabel: "Apple ID",
    appleSignedIn: "Sesion iniciada con Apple",
    staffAppleFail: "Entraste, pero WHS no pudo guardar el acceso de personal. Toca Sign in with Apple otra vez.",
    staffNotListed: "Este Apple ID aún no está en la lista del personal. Envía este ID al administrador de WHS:",
    staffCopyId: "Copiar ID",
    staffRoleRetry: "No se pudo confirmar tu rol de personal. Inténtalo de nuevo.",
    staffCodeWrong: "Ese código de acceso no es correcto.",
    issuePassNeedStaff: "Este Apple ID no esta inscrito como personal.",
    staffCodeLabel: "Código de acceso del personal",
    roleStudent: "Estudiante",
    roleTeacher: "Maestro",
    gateHint: "",
    useCode: "Usar mi código web WHS",
    webCodeTitle: "Código web WHS",
    webCodeGuestHint: "Muéstralo a un maestro para que emita un pase de pasillo o Flex a este dispositivo.",
    webCodeCopy: "Copiar código",
    webCodeShow: "Mostrar código",
    webCodeHide: "Ocultar código",
    webCodeHiddenLabel: "Código web WHS oculto",
    webCodeReset: "Restablecer código web",
    webCodeResetTitle: "¿Restablecer tu código web WHS?",
    webCodeResetBody: "Úsalo si alguien vio tu código. Recibes un código nuevo y el anterior deja de funcionar. Los pases enviados al código anterior ya no aparecerán aquí.",
    webCodeResetConfirm: "Restablecer código",
    webCodeResetCancel: "Mantener mi código",
    webCodeResetWorking: "Creando tu código nuevo…",
    webCodeResetNeedApple: "Primero entra con Apple en este navegador y luego restablece tu código.",
    webCodeResetFail: "Tu código no cambió. Revisa tu conexión e inténtalo de nuevo.",
    webCodeCopied: "Copiado",
    webCodeSaveFail: "No se pudo guardar tu código web. Revisa la conexión de la escuela e inténtalo de nuevo.",
    addHome: "Añadir a inicio",
    addHomeSub: "Abre WHS como una app, sin la barra del navegador",
    addHomeOnDevice: "WHS está en esta pantalla de inicio",
    addHomeOnDeviceSub: "Abre el icono de WHS como una app.",
    addHomeTitle: "Añadir WHS a inicio",
    addHomeIPhone: "En iPhone o iPad: toca Compartir y luego Añadir a pantalla de inicio.",
    addHomeAndroid: "En Android: toca el menú del navegador y luego Instalar app o Añadir a pantalla de inicio.",
    addHomeChrome: "En un Chromebook: abre el menú de Chrome, luego Instalar WHS, o Crear acceso directo y activa Abrir como ventana.",
    addHomeInstall: "Instalar WHS",
    gateFail: "No se encontró ese código. Revisa las letras. Abre la app de iPhone para que guarde el código y vuelve a intentar.",
    dashStudent: "Tu panel de este dispositivo. Tarjeta Swipe, las clases y los pases aceptados se sincronizan desde iPhone con este código web.",
    yourPasses: "Tus pases",
    noneYet: "Aún no hay pases",
    noStudentPasses: "No hay pases guardados en este dispositivo. Acepta un pase y recarga.",
    signature: "FIRMA DEL MAESTRO",
    studentNameLabel: "NOMBRE DEL ESTUDIANTE",
    destinationLabel: "DESTINO",
    datesLabel: "FECHA(S)",
    dashTeacher: "Panel de maestro. El registro de pases es el mismo que el de administrador. Emite un pase aquí si no tienes iPhone.",
    dashParent: "Panel de padre. Las noticias están en la campana. El personal está en Contactos.",
    dashAdmin: "Panel de administrador. El registro de pases está aquí. Los estudiantes no lo ven.",
    openLunch: "Almuerzo WHS",
    openNews: "Noticias",
    lunchMenu: "Almuerzo WHS",
    wire: "Warrior's Wire",
    wireSub: "Abrir el periódico escolar",
    wireOpen: "Abrir Warrior's Wire",
    newsFeed: "Notificaciones",
    alumniTitle: "¡Ya están abiertas las propuestas de Alumni Spotlight!",
    alumniSubtitle: "Warrior's Wire · Toca para ver",
    nthsTitle: "¡Ya están abiertas las solicitudes de NTHS!",
    nthsSubtitle: "Sociedad Nacional de Honor Técnico · Toca para ver",
    publishingTitle: "¡La recaudación de Publishing está abierta ahora!",
    publishingSubtitle: "Warrior's Wire · Toca para ver",
    openContacts: "Directorio",
    openPasses: "Registro de pases",
    auditOpen: "Registro de auditoría",
    auditTitle: "Registro de auditoría",
    auditIntro: "Cada vez que el personal ve el registro de pases o emite, revoca o borra pases.",
    auditSearch: "Buscar por personal, acción o pase",
    auditLoading: "Cargando el registro de auditoría…",
    auditEmpty: "Todavía no hay entradas.",
    auditMore: "Cargar más",
    auditPasses: "Pases",
    auditAppleID: "Apple ID",
    auditUnknown: "Personal desconocido",
    auditViewLog: "Vio el registro de pases",
    auditIssue: "Emitió un pase",
    auditRevoke: "Revocó un pase",
    auditClear: "Borró el registro de pases",
    auditViewAudit: "Vio el registro de auditoría",
    auditNeedApple: "Entra con Apple en este navegador para ver el registro de auditoría.",
    auditDenied: "Solo los administradores pueden ver el registro de auditoría.",
    auditNeedIndex: "El registro de auditoría aún no se puede buscar. En CloudKit Dashboard, agrega un índice Sortable en WHSAuditLog createdTimestamp.",
    auditFail: "No se pudo cargar el registro de auditoría. Revisa tu conexión e inténtalo de nuevo.",
    swipe: "Tarjeta Swipe",
    swipeSub: "Añade la foto de tu ID para usar Swipe",
    noSwipe: "Aún no hay Tarjeta Swipe en este dispositivo. Añade la foto de tu ID en Tarjeta Swipe en iPhone y recarga.",
    swipeGuestEmpty: "Añade una foto de tu ID de estudiante para usar Swipe en este dispositivo.",
    addSwipePhoto: "Añadir foto de ID",
    replaceSwipePhoto: "Cambiar foto de ID",
    passesTile: "Pases de maestros",
    passesSub: "Pasillo y Flex",
    issuePass: "Emitir un pase",
    issuePassBody: "El mismo pase de pasillo o Flex que en iPhone. Llega al sitio y al iPhone de ese estudiante.",
    issuePassType: "Tipo de pase",
    issuePassStudent: "Nombre del estudiante",
    issuePassDestination: "Destino",
    issuePassDates: "Fecha(s)",
    issuePassSignature: "Firma del maestro",
    issuePassClearSig: "Borrar firma",
    issuePassCode: "Código web WHS del estudiante",
    issuePassNeedFields: "Agrega nombre, destino, fecha, firma y código web WHS.",
    issuePassNeedApple: "Entra con Apple para enviar este pase.",
    issuePassFail: "No se pudo emitir ese pase.",
    issuePassDone: "Pase enviado. El estudiante lo verá en Pases de maestros.",
    issuePassBadCode: "No se encontró ese código web WHS.",
    issuePassWorking: "Enviando pase",
    issuePassStepSave: "Guardando el pase",
    issuePassStepStudent: "Enviandolo al estudiante",
    issuePassStepSignature: "Guardando la firma",
    news: "Noticias", lunch: "Almuerzo", contacts: "Contactos", classes: "Clases", more: "Más", home: "Inicio",
    calendar: "Calendario", agenda: "Agenda",
    calendarEmpty: "Abre las noticias de la escuela de esta semana.",
    lunchSub: "Menú de esta semana",
    ask: "Ask WHS", aide: "Warrior's Aide",
    shortcuts: "Atajos",
    classesTile: "Clases",
    classesSub: "Aún no hay clases",
    noClasses: "Aún no hay clases en este dispositivo. Añade una clase en iPhone y recarga.",
    noClassesGuest: "Aún no hay clases en este dispositivo. Añade una clase aquí para abrir sus recursos.",
    addClass: "Añadir una clase",
    editClass: "Editar clase",
    deleteClass: "Eliminar clase",
    deleteClassTitle: "¿Eliminar esta clase?",
    deleteClassBody: "Esta clase saldrá de este dispositivo. Puedes añadirla de nuevo después.",
    saveClass: "Guardar",
    classSubject: "Materia",
    classTeacher: "Maestro",
    classLevel: "Nivel",
    classCategory: "Categoría",
    classRoom: "Salón",
    classClassroom: "Enlace de Classroom",
    classNeedInfo: "Escribe la materia y el maestro.",
    catMath: "Matemáticas",
    catEnglish: "Inglés",
    catScience: "Ciencias",
    catSpanish: "Español",
    catHistory: "Historia",
    catCTE: "CTE",
    catPublishing: "Publishing",
    levelCP: "College Prep",
    levelHonors: "Honors",
    levelAP: "AP",
    levelECE: "ECE",
    levelDual: "Dual Enrollment",
    levelElective: "Electivo",
    resources: "Recursos",
    noResources: "Aún no hay recursos para esta clase.",
    classroom: "Ir a Classroom",
    openOnPhone: "Esto se queda en iPhone.",
    studyFolder: "Carpeta de estudio de español",
    studyGames: "Juegos de estudio",
    readySets: "Conjuntos de gramática listos",
    readyHint: "Juega conjuntos de gramática listos. Elige un conjunto y luego la respuesta.",
    presentTense: "Presente",
    bootVerbsGame: "Verbos de bota",
    serEstarGame: "Ser vs estar",
    preteriteGame: "Pretérito",
    aspectGame: "Pretérito vs imperfecto",
    articlesSet: "Artículos",
    numbersSet: "Números",
    chooseAnswer: "Elige la respuesta",
    learnCorrect: "Correcto",
    learnIncorrect: "Incorrecto",
    continueBtn: "Continuar",
    practiceAgain: "Practicar de nuevo",
    aspectDone: "Oraciones terminadas",
    englishQuiz: "Quiz de definiciones",
    flashcards: "Tarjetas",
    quiz: "Quiz",
    tapReveal: "Toca para ver",
    next: "Siguiente",
    previous: "Anterior",
    noWords: "Aún no hay palabras en esta lista. Escanéalas en iPhone y recarga.",
    quizDone: "Quiz completo",
    correct: "Correctas",
    classesBody: "Tus clases y listas de estudio se sincronizan desde iPhone con tu código web.",
    moreBody: "Este sitio muestra noticias, almuerzo, personal y tu ID. Enviar pases, quizzes y el chat se quedan en iPhone.",
    signOut: "Eliminar este perfil de este dispositivo",
    signOutTitle: "¿Eliminar este perfil de este dispositivo?",
    signOutBody: "Esto borra tu nombre, código web, foto de Tarjeta Swipe, foto del ID y el inicio de sesión de Apple de este dispositivo, y elimina este perfil del sitio de la escuela.",
    signOutCancel: "Conservar perfil",
    signOutConfirm: "Eliminar perfil",
    signOutCloudSkipped: "El perfil de este dispositivo se eliminó. La copia del sitio de la escuela no se quitó porque el inicio de sesión con Apple no estaba activo en este navegador. Entra con Apple en este dispositivo y elimina el perfil otra vez para quitarlo del sitio de la escuela.",
    admin: "Administrador",
    adminHint: "Token de API de CloudKit. Los estudiantes pueden ignorar esto. El registro de pases está en este menú.",
    token: "Token de API de CloudKit",
    env: "Entorno",
    saveToken: "Guardar token",
    tokenSaved: "Token guardado en este dispositivo.",
    refresh: "Actualizar",
    back: "Atrás",
    close: "Cerrar",
    emptyPasses: "Aún no hay pases.",
    passSearch: "Nombre del estudiante, destino o fecha",
    passSearchEmpty: "No hay pases que coincidan.",
    passNoDate: "Sin fecha",
    revoked: "Revocado",
    revokePass: "Revocar pase",
    revokePassTitle: "¿Revocar este pase?",
    revokePassBody: "Saldrá del iPhone y del sitio del estudiante. Se queda en este registro como revocado.",
    revokePassFail: "No se pudo revocar ese pase.",
    revokePassNeedApple: "Entra con Apple para revocar este pase.",
    revokePassDone: "Este pase está revocado. El estudiante no puede usarlo.",
    adminPassWipeTitle: "Vaciar registro de pases",
    adminPassWipe: "Revocar todos los pases y vaciar el registro",
    adminPassWipeBody: "Esta anulacion revoca cada pase de pasillo y Flex para los estudiantes y luego vacia el registro del campus. Necesita el codigo de acceso de administrador.",
    adminPassWipeCode: "Escribe CLEAR",
    adminPassWipeConfirmTitle: "Vaciar el registro de pases?",
    adminPassWipeConfirmBody: "Se revocara cada pase de estudiante. El registro del campus quedara vacio. No se puede deshacer.",
    adminPassWipeBadCode: "Escribe CLEAR para confirmar.",
    adminPassWipeNeedApple: "Entra con Apple para vaciar el registro.",
    adminPassWipeDone: "Todos los pases estan revocados. El registro del campus esta vacio.",
    adminPassWipeFail: "No se pudo vaciar el registro.",
    adminPassWipeCancel: "Cancelar",
    adminPassWipeConfirm: "Vaciar y borrar todos los pases",
    adminPassWipeWorking: "Vaciando el registro de pases",
    adminPassWipeStepCollect: "Buscando cada pase de pasillo y Flex",
    adminPassWipeStepRevoke: "Revocando pases de estudiantes",
    adminPassWipeStepClear: "Quitando pases del registro del campus",
    adminPassWipeStepEmpty: "Vaciando la lista en vivo",
    adminPassWipeCount: "Pase",
    hallway: "PASE DE PASILLO", flex: "PASE FLEX",
    search: "Nombre, rol o correo",
    newsEmpty: "Aún no hay noticias.",
    newsNeedToken: "Las noticias necesitan el token de CloudKit. Un administrador puede pegarlo en Más.",
    composeNews: "Crear un aviso nuevo",
    composeNewsBody: "Los estudiantes lo ven en Notificaciones en el sitio y en iPhone.",
    newsTitleLabel: "Título",
    newsStoryLabel: "Descripción",
    newsImageLabel: "Imagen",
    newsPickImage: "Elegir imagen",
    newsPublish: "Publicar",
    newsNeedFields: "Agrega una imagen, un título y una descripción.",
    newsPublishFail: "No se pudo publicar ese aviso.",
    newsPublishNeedApple: "Entra con Apple para publicar este aviso.",
    newsPublished: "Publicado. Los estudiantes lo verán en Notificaciones.",
    postsNav: "Avisos",
    postsList: "Avisos actuales",
    postsEmpty: "Aún no hay avisos.",
    deletePost: "Eliminar",
    deletePostTitle: "¿Eliminar este aviso?",
    deletePostBody: "Los estudiantes ya no lo verán en Notificaciones en el sitio ni en iPhone.",
    deletePostFail: "No se pudo eliminar ese aviso.",
    deletePostNeedApple: "Entra con Apple para eliminar este aviso.",
    language: "Idioma",
    email: "Correo",
    idTitle: "Tarjeta Swipe",
    school: "Watertown High School",
    role: "Rol",
    grade: "Grado",
    guest: "Invitado",
    passesHint: "Los maestros envían pases en iPhone. Los estudiantes los aceptan allí. El registro de administrador está en Más.",
    askTitle: "Ask WHS",
    askPlaceholder: "Almuerzo, noticias, un maestro…",
    askGo: "Preguntar",
    askEmpty: "Prueba almuerzo, noticias, un maestro o asistencia.",
    aideTitle: "Warrior's Aide",
    aideBody: "¿Correo del personal, almuerzo o noticias? Usa los botones. Asistencia: whsattendance@watertownps.org.",
    attendance: "Escribir a asistencia"
  }
};

let lang = localStorage.getItem("whsAdminLang") || "en";
let view = "home";
let configured = false;
let staff = [];
let profile = JSON.parse(localStorage.getItem("whsWebProfile") || "null");
if (profile && typeof profile === "object") {
  delete profile.staffProof;
  delete profile.staffEnrolled;
}
let lunchReady = false;
let deferredInstall = null;
function normalizeRole(value) {
  const raw = String(value || "").toLowerCase().trim();
  if (raw === "administrator" || raw === "admin") return "administrator";
  if (raw === "teacher") return "teacher";
  if (raw === "parent") return "parent";
  if (raw === "student") return "student";
  if (raw === "guest") return "guest";
  return "";
}
function currentRole() { return normalizeRole(profile && profile.role); }
function isGuest() {
  if (!profile) return false;
  if (profile.guest) return true;
  if (currentRole() === "guest") return true;
  return !String(profile.key || "").trim();
}
function hasWebKey() {
  return normalizeCode(profile && profile.key).length === 10;
}
function isPairedStudent() {
  return currentRole() === "student" && hasWebKey() && !isGuest();
}
function isGuestStudent() {
  if (!isGuest()) return false;
  const role = currentRole();
  return role === "student" || role === "guest" || role === "";
}
function canSeeOwnPasses() {
  return hasWebKey() && (isPairedStudent() || isGuestStudent());
}
function formatWebKey(value) {
  const compact = normalizeCode(value);
  if (compact.length === 10) return compact.slice(0, 5) + "-" + compact.slice(5);
  return compact;
}
function makeWebUnlockKey() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  let key = "";
  for (let i = 0; i < bytes.length; i += 1) key += alphabet[bytes[i] % alphabet.length];
  return key;
}
function isStandaloneApp() {
  return window.matchMedia("(display-mode: standalone)").matches
    || window.matchMedia("(display-mode: window-controls-overlay)").matches
    || window.navigator.standalone === true;
}
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstall = event;
});
window.addEventListener("appinstalled", () => {
  deferredInstall = null;
  closeSheet();
  if (view === "more") renderMore();
});
function guestHomeCard() {
  const c = t();
  if (isStandaloneApp()) {
    return `<div class="card wide"><div class="t">${c.addHomeOnDevice}</div><div class="s">${c.addHomeOnDeviceSub}</div></div>`;
  }
  return `<button class="card action" type="button" data-action="addHome"><div class="t">${c.addHome}</div><div class="s">${c.addHomeSub}</div></button>`;
}
function showAddHome() {
  const c = t();
  const install = deferredInstall
    ? `<button class="primary" type="button" data-action="installHome" style="width:100%;margin-top:12px;">${c.addHomeInstall}</button>`
    : "";
  openSheet(`
    <div class="card-title"><b>${c.addHomeTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <ul class="home-steps">
      <li>${c.addHomeIPhone}</li>
      <li>${c.addHomeAndroid}</li>
      <li>${c.addHomeChrome}</li>
    </ul>
    ${install}`);
}
async function promptInstallHome() {
  if (!deferredInstall) {
    showAddHome();
    return;
  }
  const prompt = deferredInstall;
  deferredInstall = null;
  try {
    await prompt.prompt();
  } catch (_) {}
  closeSheet();
  if (view === "more") renderMore();
}
function verifiedStaffRole() {
  return window._verifiedStaffRole === "teacher" || window._verifiedStaffRole === "administrator"
    ? window._verifiedStaffRole
    : "";
}
function canSeePassLog() {
  const role = verifiedStaffRole();
  return role === "teacher" || role === "administrator";
}
function showPassMenu() {
  const role = currentRole();
  return canSeePassLog() || role === "teacher" || role === "administrator";
}
function canClearPassLog() {
  return verifiedStaffRole() === "administrator";
}
// Only shows the button. CloudKit is the real lock: it returns audit entries only to Apple IDs
// with the WHSAdmin role, so changing this page can't reveal them to anyone else.
function canSeeAuditLog() {
  return verifiedStaffRole() === "administrator";
}
function canRevokePass() {
  return canSeePassLog();
}
function canIssuePass() {
  return canSeePassLog();
}
function canPostNews() {
  return verifiedStaffRole() === "administrator";
}
function signedIn() {
  if (isGuest()) return true;
  return !!(profile && profile.key && currentRole());
}
if (profile && !signedIn()) {
  localStorage.removeItem("whsWebProfile");
  profile = null;
}
function t() { return copy[lang] || copy.en; }
function schoolToken() {
  const fromWindow = String(window.WHS_SCHOOL_TOKEN || "").trim();
  if (fromWindow) return fromWindow;
  try { return localStorage.getItem("whsAdminToken") || ""; } catch (_) { return ""; }
}
function schoolEnv() {
  return localStorage.getItem("whsAdminEnv") || window.WHS_CK_ENV || "development";
}
function cloudDb() {
  try { return CloudKit.getDefaultContainer().publicCloudDatabase; } catch (_) { return null; }
}
function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}
function greeting(name) {
  const hour = new Date().getHours();
  const n = name || "Warrior";
  if (lang === "es") {
    if (hour >= 5 && hour < 12) return "Buenos días, " + n;
    if (hour >= 12 && hour < 21) return "Buenas tardes, " + n;
    return "Buenas noches, " + n;
  }
  if (hour >= 5 && hour < 12) return "Good morning, " + n;
  if (hour >= 12 && hour < 17) return "Good afternoon, " + n;
  if (hour >= 17 && hour < 21) return "Good evening, " + n;
  return "Good night, " + n;
}
const icons = {
  house: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.4 3.15a.7.7 0 0 0-.8 0L2.7 9.7a.75.75 0 0 0 .45 1.33h1.4v8.22c0 .7.56 1.25 1.25 1.25h3.7v-5.6c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v5.6h3.7c.7 0 1.25-.55 1.25-1.25V11h1.4a.75.75 0 0 0 .45-1.33z"/></svg>',
  books: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.2 3.5h3.1c.7 0 1.2.55 1.2 1.2v14.6c0 .7-.55 1.2-1.2 1.2H6.2c-.7 0-1.2-.5-1.2-1.2V4.7c0-.65.5-1.2 1.2-1.2zm8.5 0h3.1c.7 0 1.2.55 1.2 1.2v12.3c.7.15 1.2.75 1.2 1.5 0 .85-.7 1.5-1.5 1.5h-4c-.8 0-1.5-.65-1.5-1.5 0-.75.5-1.35 1.2-1.5V4.7c0-.65.5-1.2 1.2-1.2z"/></svg>',
  person: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12.2a4.35 4.35 0 1 0 0-8.7 4.35 4.35 0 0 0 0 8.7zM4.4 20.4c.45-3.55 3.55-6 7.6-6s7.15 2.45 7.6 6c.08.6-.4 1.1-1 1.1H5.4c-.6 0-1.08-.5-1-1.1z"/></svg>',
  more: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6.5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="17.5" cy="12" r="1.9"/></svg>',
  bell: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22.2a2.35 2.35 0 0 0 2.3-2.2h-4.6A2.35 2.35 0 0 0 12 22.2zM19.2 16V11a7.2 7.2 0 0 0-5.1-6.85V3.7a2.1 2.1 0 1 0-4.2 0v.45A7.2 7.2 0 0 0 4.8 11v5L3.15 17.7c-.55.55-.16 1.5.62 1.5h16.46c.78 0 1.17-.95.62-1.5z"/></svg>',
  fork: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 2.5c.45 0 .8.35.8.8v6.1c0 .9-.55 1.65-1.35 1.9V20.7c0 .45-.35.8-.8.8s-.8-.35-.8-.8v-9.4C5.25 10.85 4.7 10.1 4.7 9.2V3.3c0-.45.35-.8.8-.8s.8.35.8.8v5.3h.55V3.3c0-.45.35-.8.8-.8s.8.35.8.8v5.3h.55V3.3c0-.45.35-.8.8-.8zM16.6 2.5c.45 0 .8.35.8.8v7.2h.7c.9 0 1.65.75 1.65 1.65V20.7c0 .45-.35.8-.8.8s-.8-.35-.8-.8v-8h-.75c-.9 0-1.65-.75-1.65-1.65V3.3c0-.45.35-.8.85-.8z"/></svg>',
  mega: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 6.2v11.6c0 .7-.8 1.1-1.4.7L14 15H8.5C5.5 15 3 12.5 3 9.5S5.5 4 8.5 4H14l5.6-3.5c.6-.4 1.4 0 1.4.7zM8.2 16.5 10 19.8c.3.5 0 1.2-.6 1.2H7.3c-.4 0-.7-.2-.9-.6L4.8 16.5z"/></svg>'
};
function initials(name) {
  const parts = String(name || "W").trim().split(/\s+/);
  return ((parts[0] || "W")[0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
}
function roleLabel() {
  const role = currentRole();
  if (role === "administrator") return t().admin;
  if (role === "teacher") return t().roleTeacher;
  if (role === "parent") return lang === "es" ? "Padre" : "Parent";
  if (role === "student") return t().roleStudent;
  if (role === "guest") return t().guest;
  return "";
}
function withApiToken(url) {
  const token = schoolToken();
  if (!url) return "";
  if (!token) return url;
  return String(url)
    .replace(/\$\{apiToken\}/g, encodeURIComponent(token))
    .replace(/%24%7BapiToken%7D/gi, encodeURIComponent(token));
}
function findDownloadURL(node) {
  if (!node || typeof node !== "object") return "";
  if (typeof node.downloadURL === "string" && node.downloadURL) return node.downloadURL;
  if (typeof node.downloadURL === "function") {
    try {
      const got = node.downloadURL();
      if (got) return String(got);
    } catch (_) {}
  }
  if (typeof node.getDownloadURL === "function") {
    try {
      const got = node.getDownloadURL();
      if (got) return String(got);
    } catch (_) {}
  }
  if (node.value && node.value !== node) return findDownloadURL(node.value);
  return "";
}
function unwrapField(field) {
  if (field == null) return "";
  if (typeof field !== "object") return String(field);
  const asset = findDownloadURL(field);
  if (asset) return withApiToken(asset);
  const value = Object.prototype.hasOwnProperty.call(field, "value") ? field.value : field;
  if (value == null) return "";
  if (typeof value === "number" && value > 1000000000000) return new Date(value).toLocaleString();
  return typeof value === "object" ? "" : String(value);
}
function fieldValue(record, key) {
  if (!record) return "";
  if (typeof record.get === "function") {
    try {
      const got = record.get(key);
      if (got != null && got !== "") return unwrapField(got);
    } catch (_) {}
  }
  if (record[key] != null && record[key] !== "") return unwrapField(record[key]);
  return unwrapField(record.fields && record.fields[key]);
}
function recordsFrom(response) {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.records)) return response.records;
  if (response.recordName) return [response];
  return [];
}
function normalizeCode(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}
function gateIsOpen() {
  return gate && !gate.classList.contains("hidden");
}
function gateWantsAppleAuth() {
  return window._gateStep === "apple" && !!window._pendingGuestStaff;
}
function parkCkAuth() {
  if (gateWantsAppleAuth()) return;
  document.body.classList.remove("whs-apple-gate");
}
function closeSheet() {
  if (window._passWipeBusy || window._issuePassBusy) return;
  if (!gateWantsAppleAuth()) parkCkAuth();
  sheet.classList.add("hidden");
  sheetCard.innerHTML = "";
}
function openSheet(html) {
  sheetCard.innerHTML = html;
  sheet.classList.remove("hidden");
}
function confirmRemoveProfile() {
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.signOutTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.signOutBody}</p>
    <button class="primary" type="button" data-action="closeSheet">${c.signOutCancel}</button>
    <button class="ghost" type="button" data-action="removeProfile" style="width:100%;margin-top:8px;color:#B42318;">${c.signOutConfirm}</button>`);
}
function removeChromebookProfile() {
  const person = profile;
  closeSheet();
  eraseOwnedProfileRecords(person).then((removed) => {
    forgetLocalProfile();
    showGate();
    if (removed === false && gateError) gateError.textContent = t().signOutCloudSkipped;
  }).catch(() => {
    forgetLocalProfile();
    showGate();
  });
}
async function eraseOwnedProfileRecords(person) {
  const key = normalizeCode(person && person.key);
  const names = [];
  if (key.length === 10) {
    const tag = await privateCodeTag(key);
    names.push(key, "webpass." + key, "webpass." + key.slice(0, 5) + "-" + key.slice(5));
    if (tag) names.push("webpass.p." + tag);
    inboxNames(key).forEach((name) => names.push(name));
    privateInboxNames(tag).forEach((name) => names.push(name));
  }
  const unique = [...new Set(names.filter(Boolean))];
  if (!unique.length) return;
  let foundRecords = [];
  try { foundRecords = await restLookupExact(unique); } catch (_) {}
  foundRecords.forEach((record) => {
    if (normalizeCode(record.recordName) !== key) return;
    parsePassIDs(fieldValue(record, "passIDs")).forEach((id) => names.push("seal." + id));
  });
  const found = foundRecords.map((record) => String(record.recordName || "")).filter(Boolean);
  const seals = names.filter((name) => name.indexOf("seal.") === 0);
  const targets = [...new Set(found.concat(seals).concat(key.length === 10 ? [key, "webpass." + key] : []))];
  if (!targets.length) return true;
  if (!ckWebAuthToken()) return false;
  for (let start = 0; start < targets.length; start += 40) {
    const ops = targets.slice(start, start + 40).map((recordName) => ({
      operationType: "forceDelete",
      record: { recordName }
    }));
    try { await restModifyOps(ops); } catch (_) {}
  }
  return true;
}
function forgetLocalProfile() {
  try {
    const container = CloudKit.getDefaultContainer();
    if (container && typeof container.signOut === "function") container.signOut();
  } catch (_) {}
  dropStaleCloudSession();
  try {
    const auth = CloudKit.getDefaultContainer()._auth;
    if (auth && typeof auth._setSession === "function") auth._setSession(null);
    if (auth) auth._ckSession = "";
  } catch (_) {}
  const expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = CONTAINER + "=; " + expires + "; path=/";
  document.cookie = CONTAINER + "=; " + expires + "; path=";
  try {
    const drop = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const name = localStorage.key(i);
      if (name === "whsPassWebKeys" || (name && name.indexOf("whsPassCache:") === 0)) drop.push(name);
    }
    drop.forEach((name) => localStorage.removeItem(name));
    localStorage.removeItem("whsWebProfile");
  } catch (_) {}
  try { localStorage.removeItem("whsNewsIds"); } catch (_) {}
  try {
    Object.keys(sessionStorage).forEach((key) => {
      if (/^whs/i.test(key)) sessionStorage.removeItem(key);
    });
  } catch (_) {}
  profile = null;
  window._ckUserRecordName = "";
  window._appleReady = false;
  window._appleNeedsRenew = true;
  window._pendingGuestStaff = null;
  window._verifiedStaffRole = "";
  window._pendingNewsPost = false;
  window._pendingIssuePass = false;
  window._newsDraftFile = null;
  window._passWipeProof = "";
  window._passRecords = {};
  window._staffKeyPromise = null;
  window._passLogList = [];
  window._revokedPassIDs = new Set();
  window._clearedPassIDs = new Set();
  window._profilePhoto = "";
  applyAvatar("");
  if (window.caches && caches.keys) {
    caches.keys().then((keys) => keys.forEach((key) => caches.delete(key))).catch(() => {});
  }
}

async function ensureCloud() {
  return !!schoolToken();
}
async function refreshCloudAuth() {
  if (!configured) return;
  try { await CloudKit.getDefaultContainer().setUpAuth(); } catch (_) {}
}
async function setupCloudAuth() {
  const token = schoolToken();
  if (!token) return false;
  const node = document.getElementById("apple-sign-in-placeholder");
  if (node) node.getBoundingClientRect();
  if (!configured) {
    CloudKit.configure({
      containers: [{
        containerIdentifier: CONTAINER,
        apiTokenAuth: {
          apiToken: token,
          persist: true,
          signInButton: { id: "apple-sign-in-placeholder", theme: "black" },
          signOutButton: { id: "apple-sign-out-placeholder", theme: "black" }
        },
        environment: schoolEnv()
      }]
    });
    configured = true;
  }
  try { await CloudKit.getDefaultContainer().setUpAuth(); } catch (_) {}
  return true;
}
function parkAuthForRestore() {
  const parked = [];
  ["gate", "gateApple"].forEach((id) => {
    const node = document.getElementById(id);
    if (!node) return;
    parked.push({ node, wasHidden: node.classList.contains("hidden") });
    node.classList.add("whs-auth-park");
    node.classList.remove("hidden");
  });
  return parked;
}
function unparkAuth(parked) {
  (parked || []).forEach(({ node, wasHidden }) => {
    node.classList.remove("whs-auth-park");
    if (window._gateStep === "apple") return;
    node.classList.toggle("hidden", !!wasHidden);
  });
}
function rememberAppleUser(name) {
  const id = String(name || "").trim();
  if (!id) return;
  window._ckUserRecordName = id;
  if (!profile || profile.appleUser === id) return;
  profile.appleUser = id;
  try { localStorage.setItem("whsWebProfile", JSON.stringify(profile)); } catch (_) {}
}
function dropStaleCloudSession() {
  window._ckUserRecordName = "";
  window._appleReady = false;
  window._appleNeedsRenew = true;
  try {
    const auth = CloudKit.getDefaultContainer()._auth;
    if (auth && auth._signInURL) window._appleSignInURL = auth._signInURL;
    if (auth) auth._ckSession = "";
  } catch (_) {}
}
function appleSignInURL() {
  try {
    const auth = CloudKit.getDefaultContainer()._auth;
    const url = String((auth && auth._signInURL) || window._appleSignInURL || "");
    if (url) window._appleSignInURL = url;
    return url;
  } catch (_) {
    return String(window._appleSignInURL || "");
  }
}
function storeAppleSession(session) {
  const value = String(session || "").trim();
  if (!value) return false;
  try {
    const auth = CloudKit.getDefaultContainer()._auth;
    if (auth && typeof auth._setSession === "function") auth._setSession(value);
    else if (auth) auth._ckSession = value;
  } catch (_) {
    return false;
  }
  window._appleNeedsRenew = false;
  window._appleReady = !!ckWebAuthToken();
  return window._appleReady;
}
function appleMessageOrigin(origin) {
  try {
    const host = new URL(origin).hostname;
    return host === "apple.com" || host.endsWith(".apple.com") || host === "icloud.com" || host.endsWith(".icloud.com") || host === "apple-cloudkit.com" || host.endsWith(".apple-cloudkit.com");
  } catch (_) {
    return false;
  }
}
function waitForCkSession(popup) {
  return new Promise((resolve) => {
    let done = false;
    const finish = (value) => {
      if (done) return;
      done = true;
      window.removeEventListener("message", onMessage);
      clearInterval(watch);
      clearTimeout(timer);
      resolve(value || "");
    };
    const onMessage = (event) => {
      const fromPopup = popup && event.source === popup;
      if (!fromPopup && !appleMessageOrigin(event.origin)) return;
      const data = event.data;
      if (!data || typeof data !== "object" || !data.ckSession) return;
      finish(String(data.ckSession));
    };
    window.addEventListener("message", onMessage);
    const watch = setInterval(() => {
      if (popup && popup.closed) finish("");
    }, 400);
    const timer = setTimeout(() => finish(""), 120000);
  });
}
async function fetchAppleSignInURL() {
  const existing = appleSignInURL();
  if (existing) return existing;
  if (!schoolToken()) return "";
  try {
    const response = await fetch(restPublicUrl("users/caller", true), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}"
    });
    const payload = await response.json();
    const url = String((payload && payload.redirectURL) || "");
    if (url) window._appleSignInURL = url;
    return url;
  } catch (_) {
    return "";
  }
}
async function renewAppleForSend(popup) {
  if (window._appleReady && ckWebAuthToken() && !window._appleNeedsRenew) {
    try { if (popup && !popup.closed) popup.close(); } catch (_) {}
    return true;
  }
  const url = await fetchAppleSignInURL();
  let win = popup && !popup.closed ? popup : null;
  if (win && url) {
    try { win.location.href = url; } catch (_) { win = null; }
  }
  if ((!win || win.closed) && url) win = window.open(url, "whsAppleRenew", "width=640,height=720");
  if (!win || win.closed || !url) {
    window._applePopupBlocked = !win;
    try { if (win && !win.closed) win.close(); } catch (_) {}
    return false;
  }
  window._applePopupBlocked = false;
  const session = await waitForCkSession(win);
  try { if (win && !win.closed) win.close(); } catch (_) {}
  if (!session || !storeAppleSession(session)) return false;
  try {
    const identity = await CloudKit.getDefaultContainer().fetchCurrentUserIdentity();
    const name = userNameFromInfo(identity) || userNameFromInfo(identity && identity.userInfo);
    if (name) rememberAppleUser(name);
  } catch (_) {}
  window._appleReady = !!ckWebAuthToken();
  window._appleNeedsRenew = !window._appleReady;
  return window._appleReady;
}
async function appleSessionAlive() {
  try {
    const container = CloudKit.getDefaultContainer();
    if (!container) return false;
    const info = await container.setUpAuth();
    const fromAuth = userNameFromInfo(info);
    if (fromAuth && ckWebAuthToken()) {
      rememberAppleUser(fromAuth);
      window._appleReady = true;
      window._appleNeedsRenew = false;
      return true;
    }
    if (typeof container.fetchCurrentUserIdentity === "function") {
      const identity = await container.fetchCurrentUserIdentity();
      const fromId = userNameFromInfo(identity) || userNameFromInfo(identity && identity.userInfo);
      if (fromId && ckWebAuthToken()) {
        rememberAppleUser(fromId);
        window._appleReady = true;
        window._appleNeedsRenew = false;
        return true;
      }
    }
    if (typeof container.fetchUserRecordName === "function") {
      const fromFetch = await new Promise((resolve) => {
        let settled = false;
        const done = (value) => { if (!settled) { settled = true; resolve(value); } };
        try {
          const pending = container.fetchUserRecordName({
            success: (name) => done(name),
            failure: () => done("")
          });
          if (pending && typeof pending.then === "function") {
            pending.then((name) => done(name)).catch(() => done(""));
          }
        } catch (_) {
          done("");
        }
        setTimeout(() => done(""), 4000);
      });
      const fetched = userNameFromInfo(fromFetch);
      if (fetched && ckWebAuthToken()) {
        rememberAppleUser(fetched);
        window._appleReady = true;
        window._appleNeedsRenew = false;
        return true;
      }
    }
  } catch (error) {
    if (isAuthError(error)) {
      dropStaleCloudSession();
      return false;
    }
  }
  if (appleSignInURL() || !ckWebAuthToken()) dropStaleCloudSession();
  return false;
}
async function restoreStaffCloudSession() {
  if (window._staffAuthRestore) return window._staffAuthRestore;
  window._staffAuthRestore = (async () => {
    const needsSetup = !configured;
    const parked = needsSetup ? parkAuthForRestore() : [];
    let alive = false;
    try {
      if (needsSetup) {
        const slot = document.getElementById("apple-sign-in-placeholder");
        if (slot) await waitForVisibleSlot(slot);
      }
      try { await setupCloudAuth(); } catch (_) {}
      alive = await appleSessionAlive();
    } finally {
      unparkAuth(parked);
      window._staffAuthRestore = null;
    }
    return alive;
  })();
  return window._staffAuthRestore;
}
function ckWebAuthToken() {
  try {
    const auth = CloudKit.getDefaultContainer()._auth;
    if (auth && auth._ckSession) return String(auth._ckSession);
    if (auth && typeof auth.getConfig === "function") {
      const token = (auth.getConfig() || {}).ckWebAuthToken;
      if (!token) return "";
      try { return decodeURIComponent(token); } catch (_) { return String(token); }
    }
  } catch (_) {}
  return "";
}
function userNameFromInfo(info) {
  if (!info) return "";
  if (typeof info === "string") return info.trim();
  const name = info.userRecordName
    || (info.userInfo && info.userInfo.userRecordName)
    || (info.userIdentity && info.userIdentity.userRecordName);
  return String(name || "").trim();
}
async function ckUserRecordName() {
  if (window._ckUserRecordName) return String(window._ckUserRecordName);
  try {
    const container = CloudKit.getDefaultContainer();
    if (!container) return "";
    try {
      const info = await container.setUpAuth();
      const fromAuth = userNameFromInfo(info);
      if (fromAuth) {
        window._ckUserRecordName = fromAuth;
        return fromAuth;
      }
    } catch (_) {}
    if (typeof container.fetchCurrentUserIdentity === "function") {
      try {
        const identity = await container.fetchCurrentUserIdentity();
        const fromId = userNameFromInfo(identity) || userNameFromInfo(identity && identity.userInfo);
        if (fromId) {
          window._ckUserRecordName = fromId;
          return fromId;
        }
      } catch (_) {}
    }
    if (typeof container.fetchUserRecordName === "function") {
      const result = await new Promise((resolve) => {
        let settled = false;
        const done = (value) => { if (!settled) { settled = true; resolve(value); } };
        try {
          const pending = container.fetchUserRecordName({
            success: (name) => done(name),
            failure: () => done("")
          });
          if (pending && typeof pending.then === "function") {
            pending.then((name) => done(name)).catch(() => done(""));
          }
        } catch (_) {
          done("");
        }
        setTimeout(() => done(""), 4000);
      });
      const fromFetch = userNameFromInfo(result);
      if (fromFetch) {
        window._ckUserRecordName = fromFetch;
        return fromFetch;
      }
    }
  } catch (_) {}
  return "";
}
const STAFF_ROLE_TYPE = "WHSStaffRole";
function staffRoleRecordName(user) {
  const id = String(user || "").trim();
  return id ? "staff." + id : "";
}
async function fetchStaffRole() {
  if (!ckWebAuthToken()) return { state: "error" };
  let user = "";
  try { user = await ckUserRecordName(); } catch (_) { return { state: "error" }; }
  const name = staffRoleRecordName(user);
  if (!name) return { state: "error" };
  try { await ensureCloud(); } catch (_) {}
  let response;
  let payload = {};
  try {
    response = await fetch(restPublicUrl("records/lookup", false), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ records: [{ recordName: name }] })
    });
    payload = await response.json().catch(() => ({}));
  } catch (_) {
    return { state: "error" };
  }
  if (isAuthError(null, payload) || response.status === 421) return { state: "error" };
  const record = recordsFrom(payload).filter(usableRecord).find((item) => String(item.recordName || "") === name);
  if (record) {
    if (String(record.recordType || "") !== STAFF_ROLE_TYPE) return { state: "none" };
    const role = normalizeRole(fieldValue(record, "role"));
    if (role === "teacher" || role === "administrator") return { state: "staff", role };
    return { state: "none" };
  }
  const rows = (payload && payload.records) || [];
  const missing = rows.some((row) => /NOT_FOUND|UNKNOWN_ITEM|RESOURCE_NOT_FOUND/i.test(String((row && row.serverErrorCode) || "")));
  if (missing) return { state: "none" };
  if (!response.ok) return { state: "error" };
  return { state: "none" };
}
function dropRemovedStaff() {
  window._verifiedStaffRole = "";
  if (!profile) return;
  const staff = profile.role === "teacher" || profile.role === "administrator";
  if (!staff) return;
  if (hasWebKey() && !profile.guest) {
    profile.role = "student";
    try { localStorage.setItem("whsWebProfile", JSON.stringify(profile)); } catch (_) {}
    showGate();
    show(view || "home");
    return;
  }
  forgetLocalProfile();
  showGate();
  show("home");
}
let staffSyncing = false;
async function syncStaffRoleFromCloud() {
  if (staffSyncing) return;
  if (!profile || (currentRole() !== "teacher" && currentRole() !== "administrator")) return;
  if (!ckWebAuthToken()) return;
  staffSyncing = true;
  try {
    const looked = await fetchStaffRole();
    if (looked.state === "staff") {
      const changed = window._verifiedStaffRole !== looked.role || profile.role !== looked.role;
      window._verifiedStaffRole = looked.role;
      if (profile.role !== looked.role) {
        profile.role = looked.role;
        try { localStorage.setItem("whsWebProfile", JSON.stringify(profile)); } catch (_) {}
      }
      if (changed && view) show(view);
      return;
    }
    const hadStaff = verifiedStaffRole();
    window._verifiedStaffRole = "";
    if (looked.state === "none") dropRemovedStaff();
    else if (hadStaff && view) show(view);
  } finally {
    staffSyncing = false;
  }
}
async function requireEnrolledStaff() {
  if (!ckWebAuthToken()) throw Object.assign(new Error("APPLE"), { apple: true });
  const looked = await fetchStaffRole();
  if (looked.state === "staff") {
    window._verifiedStaffRole = looked.role;
    return looked.role;
  }
  window._verifiedStaffRole = "";
  if (looked.state === "error") throw Object.assign(new Error("FAIL"), { reason: "staff-unknown" });
  throw Object.assign(new Error("STAFF"), { staff: true });
}
async function createPassRecord(record, operation) {
  const op = operation || "create";
  requireCloudWrite();
  try {
    if (op === "create") {
      const saved = await ckCreateNews(record);
      if (saved) return saved;
    }
  } catch (error) {
    if (!(error && (error.apple || isAuthError(error)))) throw error;
  }
  const saved = await restModify(record, op);
  if (saved) return saved;
  throw Object.assign(new Error("FAIL"), { reason: "create" });
}
function keepAppleSessionFresh() {
  if (window._appleKeepalive) return;
  const renew = () => {
    if (!verifiedStaffRole() || !configured || !ckWebAuthToken()) return;
    try {
      const container = CloudKit.getDefaultContainer();
      if (container && typeof container.fetchCurrentUserIdentity === "function") {
        container.fetchCurrentUserIdentity().then((identity) => {
          const name = userNameFromInfo(identity) || userNameFromInfo(identity && identity.userInfo);
          if (name) rememberAppleUser(name);
          if (name && ckWebAuthToken()) {
            window._appleReady = true;
            window._appleNeedsRenew = false;
          }
        }).catch((error) => {
          if (isAuthError(error)) dropStaleCloudSession();
        });
      }
    } catch (_) {}
  };
  renew();
  window._appleKeepalive = setInterval(renew, 4 * 60 * 1000);
}
async function ensureSavedStaffSession(renewWindow) {
  try { await restoreStaffCloudSession(); } catch (_) {}
  if (!ckWebAuthToken()) {
    const renewed = await renewAppleForSend(renewWindow);
    if (!renewed && !ckWebAuthToken()) return false;
  } else if (renewWindow && !renewWindow.closed) {
    try { renewWindow.close(); } catch (_) {}
  }
  window._appleReady = true;
  window._appleNeedsRenew = false;
  keepAppleSessionFresh();
  return !!ckWebAuthToken();
}
function restUrl(action) {
  return restPublicUrl("records/" + action, true);
}
function restPublicUrl(path, schoolOnly) {
  const token = schoolToken();
  let url = `https://api.apple-cloudkit.com/database/1/${CONTAINER}/${schoolEnv()}/public/${path}?ckAPIToken=${encodeURIComponent(token)}`;
  const web = schoolOnly ? "" : ckWebAuthToken();
  if (web) url += `&ckWebAuthToken=${encodeURIComponent(web)}`;
  return url;
}

function codeNames(value) {
  const compact = normalizeCode(value);
  const names = [compact, String(value || "").trim().toUpperCase()];
  if (compact.length === 10) names.push(compact.slice(0, 5) + "-" + compact.slice(5));
  return [...new Set(names.filter(Boolean))];
}
function lookupNames(value) {
  const raw = String(value || "").trim();
  if (!raw) return [];
  return [...new Set([raw, ...codeNames(raw)])];
}
function usableRecord(record) {
  if (!record || record.deleted) return false;
  const err = String(record.serverErrorCode || record.reason || "").toUpperCase();
  if (/NOT_FOUND|UNKNOWN|AUTHENTICATION|ACCESS_DENIED|PERMISSION/.test(err)) return false;
  return !!(record.recordName || record.recordType || (record.fields && Object.keys(record.fields).length));
}
async function restQuery(recordType, limit) {
  const token = schoolToken();
  if (!token || !recordType) return [];
  const url = restUrl("query");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: { recordType }, resultsLimit: limit || 80 })
  });
  const payload = await response.json();
  return recordsFrom(payload).filter(usableRecord);
}
async function restLookupDetailed(names, exact) {
  const unique = exact
    ? [...new Set((names || []).map((name) => String(name || "").trim()).filter(Boolean))]
    : [...new Set((names || []).filter(Boolean).flatMap(lookupNames))];
  const token = schoolToken();
  if (!token || !unique.length) return { records: [], complete: false, failed: unique };
  const slices = [];
  for (let start = 0; start < unique.length; start += 150) slices.push(unique.slice(start, start + 150));
  const results = await Promise.all(slices.map(async (slice) => {
    const once = async () => {
      try {
        const response = await fetch(restUrl("lookup"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ records: slice.map((recordName) => ({ recordName })) })
        });
        const payload = await response.json();
        const ok = response.ok || !!(payload && payload.records);
        const rows = recordsFrom(payload);
        const hidden = rows.filter((row) => !usableRecord(row)).map((row) => row.recordName).filter(Boolean);
        return { records: rows.filter(usableRecord), ok, failed: ok ? hidden : slice };
      } catch (_) {
        return { records: [], ok: false, failed: slice };
      }
    };
    const first = await once();
    if (first.ok) return first;
    return once();
  }));
  const records = [];
  const failed = [];
  results.forEach((item) => {
    item.records.forEach((record) => records.push(record));
    failed.push(...item.failed);
  });
  return { records, complete: results.every((item) => item.ok), failed };
}
async function restLookup(names) {
  return (await restLookupDetailed(names, false)).records;
}
async function restLookupExact(names) {
  const looked = await restLookupDetailed(names, true);
  const found = looked.records.slice();
  const db = cloudDb();
  const pending = looked.failed || [];
  if (!pending.length) return found;
  if (db && typeof db.fetchRecord === "function") {
    for (const name of pending) {
      try { recordsFrom(await db.fetchRecord(name)).forEach((record) => { if (usableRecord(record)) found.push(record); }); } catch (_) {}
    }
  }
  return found;
}
async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(String(text || ""));
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
async function privateCodeTag(code) {
  const key = normalizeCode(code);
  if (key.length !== 10) return "";
  return (await sha256Hex("whs-private:" + key)).slice(0, 24);
}
function bytesToBase64(bytes) {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}
function base64ToBytes(text) {
  const bin = atob(String(text || ""));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
async function sealKey(code) {
  const raw = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("whs-seal-v1:" + normalizeCode(code)));
  return crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);
}
// Staff copies of passes are encrypted with the school key: a random key stored once in CloudKit
// in its own staff-only record type, WHSStaffKey. No key is in this code. "whs3." marks that format;
// older "whs2." copies used a key that was in the code and can't be opened.
const STAFF_KEY_TYPE = "WHSStaffKey";
const STAFF_KEY_NAME = "whs-staff-key";
const STAFF_BODY_PREFIX = "whs3.";
const STAFF_BODY_CONTEXT = new TextEncoder().encode("whs-staff-body-v3");
async function readStaffKeyRecord() {
  const response = await fetch(restPublicUrl("records/lookup", false), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ recordName: STAFF_KEY_NAME }] })
  });
  const payload = await response.json().catch(() => ({}));
  const row = ((payload && payload.records) || [])[0];
  if (!row) return { state: "error" };
  const code = String(row.serverErrorCode || "");
  if (/NOT_FOUND|UNKNOWN_ITEM/i.test(code)) return { state: "missing" };
  if (code || String(row.recordType || "") !== STAFF_KEY_TYPE) return { state: "error" };
  let bytes = null;
  try { bytes = base64ToBytes(String(fieldValue(row, "key") || "")); } catch (_) { bytes = null; }
  if (!bytes || bytes.length !== 32) return { state: "error" };
  const key = await crypto.subtle.importKey("raw", bytes, "AES-GCM", false, ["encrypt", "decrypt"]);
  return { state: "found", key };
}
async function loadOrCreateStaffKey() {
  if (!ckWebAuthToken()) return null;
  try {
    const first = await readStaffKeyRecord();
    if (first.state === "found") return first.key;
    if (first.state !== "missing") return null;
    // The first enrolled staff member to need the key creates it.
    try { await requireEnrolledStaff(); } catch (_) { return null; }
    const fresh = crypto.getRandomValues(new Uint8Array(32));
    try {
      await restModify({
        recordType: STAFF_KEY_TYPE,
        recordName: STAFF_KEY_NAME,
        fields: { key: { value: bytesToBase64(fresh) }, version: { value: 1 } }
      }, "create");
    } catch (_) {}
    // Read it back either way: if another staff device created it first, use theirs.
    const second = await readStaffKeyRecord();
    return second.state === "found" ? second.key : null;
  } catch (_) {
    return null;
  }
}
async function staffBodyKey() {
  if (!window._staffKeyPromise) window._staffKeyPromise = loadOrCreateStaffKey();
  const key = await window._staffKeyPromise;
  if (!key) window._staffKeyPromise = null;
  return key;
}
async function sealStaffBody(plain) {
  const text = String(plain || "");
  if (!text) return "";
  const key = await staffBodyKey();
  if (!key) return "";
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv, additionalData: STAFF_BODY_CONTEXT }, key, new TextEncoder().encode(text)));
  const blob = new Uint8Array(iv.length + cipher.length);
  blob.set(iv, 0);
  blob.set(cipher, iv.length);
  return STAFF_BODY_PREFIX + bytesToBase64(blob);
}
async function openStaffBody(stored) {
  const raw = String(stored || "");
  if (raw.indexOf("whs2.") === 0) return "";
  if (raw.indexOf(STAFF_BODY_PREFIX) !== 0) return raw;
  const blob = (() => { try { return base64ToBytes(raw.slice(STAFF_BODY_PREFIX.length)); } catch (_) { return null; } })();
  if (!blob || blob.length <= 28) return "";
  const attempt = async () => {
    const key = await staffBodyKey();
    if (!key) return null;
    try {
      const clear = await crypto.subtle.decrypt({ name: "AES-GCM", iv: blob.slice(0, 12), additionalData: STAFF_BODY_CONTEXT }, key, blob.slice(12));
      return new TextDecoder().decode(clear);
    } catch (_) {
      return null;
    }
  };
  let text = await attempt();
  if (text === null) {
    // The key may have been replaced in CloudKit since this page loaded; reload it once.
    window._staffKeyPromise = null;
    text = await attempt();
  }
  return text || "";
}
async function sealText(code, plain) {
  const text = String(plain || "");
  if (!text || normalizeCode(code).length !== 10) return text;
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await sealKey(code), new TextEncoder().encode(text)));
  const blob = new Uint8Array(iv.length + cipher.length);
  blob.set(iv, 0);
  blob.set(cipher, iv.length);
  return "whs1." + bytesToBase64(blob);
}
async function openSeal(code, stored) {
  const raw = String(stored || "");
  if (raw.indexOf("whs1.") !== 0) return raw;
  try {
    const blob = base64ToBytes(raw.slice(5));
    if (blob.length <= 28) return "";
    const clear = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: blob.slice(0, 12) },
      await sealKey(code),
      blob.slice(12)
    );
    return new TextDecoder().decode(clear);
  } catch (_) {
    return "";
  }
}
async function sealedOrPlain(code, sealed, plain) {
  const opened = await openSeal(code, sealed);
  if (opened) return opened;
  const fallback = String(plain || "");
  return fallback.indexOf("whs1.") === 0 ? "" : fallback;
}
async function decryptSealedBytes(code, bytes) {
  if (!bytes || bytes.length < 29) return null;
  let head = "";
  try { head = new TextDecoder().decode(bytes.slice(0, 5)); } catch (_) { head = ""; }
  if (head === "whs1.") {
    const opened = await openSeal(code, new TextDecoder().decode(bytes));
    return opened ? new TextEncoder().encode(opened) : null;
  }
  try {
    const clear = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: bytes.slice(0, 12) },
      await sealKey(code),
      bytes.slice(12)
    );
    return new Uint8Array(clear);
  } catch (_) {
    return null;
  }
}
function imageValueFromBytes(bytes) {
  if (!bytes || !bytes.length) return "";
  let head = "";
  try { head = new TextDecoder().decode(bytes.slice(0, 5)); } catch (_) { head = ""; }
  if (head === "data:") return new TextDecoder().decode(bytes);
  return "data:image/jpeg;base64," + bytesToBase64(bytes);
}
async function openSealedFile(code, record, field) {
  const url = fieldValue(record, field);
  if (!url || !/^https?:/i.test(url)) return null;
  try {
    const response = await fetch(url, { credentials: "omit", cache: "no-store" });
    if (!response.ok) return null;
    return decryptSealedBytes(code, new Uint8Array(await response.arrayBuffer()));
  } catch (_) {
    return null;
  }
}
async function profileSecrets(record, code) {
  const photoFile = await openSealedFile(code, record, "photoFile");
  const swipeFile = await openSealedFile(code, record, "swipeFile");
  const studyFile = await openSealedFile(code, record, "studyFile");
  return {
    grade: await sealedOrPlain(code, fieldValue(record, "gradeSeal"), fieldValue(record, "grade")),
    photo: photoFile ? imageValueFromBytes(photoFile) : await sealedOrPlain(code, fieldValue(record, "photoSeal"), fieldValue(record, "profilePhoto")),
    swipe: swipeFile ? imageValueFromBytes(swipeFile) : await sealedOrPlain(code, fieldValue(record, "swipeSeal"), fieldValue(record, "swipeCard")),
    study: studyFile ? new TextDecoder().decode(studyFile) : await sealedOrPlain(code, fieldValue(record, "studySeal"), fieldValue(record, "studyJSON"))
  };
}
function isGateRecordName(id) {
  const key = String(id || "").toLowerCase();
  return key.indexOf("whs-staff-gate.") === 0 || key.indexOf("whs-wipe-gate.") === 0 || key.indexOf("whs-staff-user.") === 0;
}
function requireCloudWrite() {
  if (ckWebAuthToken()) return true;
  throw Object.assign(new Error("APPLE"), { apple: true, serverErrorCode: "AUTHENTICATION_REQUIRED" });
}
async function restModifySchool() {
  throw Object.assign(new Error("APPLE"), { apple: true, serverErrorCode: "AUTHENTICATION_REQUIRED" });
}
async function restModify(record, operationType) {
  await refreshCloudAuth();
  requireCloudWrite();
  const token = schoolToken();
  if (!token || !record || !record.recordName) return null;
  const url = restPublicUrl("records/modify", false);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operations: [{
        operationType: operationType || "create",
        record
      }]
    })
  });
  const payload = await response.json();
  const records = recordsFrom(payload).filter(usableRecord);
  if (records.length) return records[0];
  throw cloudRecordError(payload, payload.records && payload.records[0]);
}
async function restModifyOps(operations) {
  await refreshCloudAuth();
  requireCloudWrite();
  const token = schoolToken();
  if (!token || !operations.length) return {};
  const url = restPublicUrl("records/modify", false);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operations })
  });
  return response.json();
}
function passRecordName(record) {
  return String((record && record.recordName) || fieldValue(record, "recordName") || "").trim();
}
function mountCkAuth() {}
async function waitForVisibleSlot(node) {
  for (let i = 0; i < 40; i += 1) {
    if (node && node.getBoundingClientRect().width > 40 && node.getBoundingClientRect().height > 20) return true;
    await new Promise((resolve) => window.setTimeout(resolve, 40));
  }
  return false;
}
async function showAppleStep() {
  window._gateStep = "apple";
  window._appleEpoch = (window._appleEpoch || 0) + 1;
  const epoch = window._appleEpoch;
  document.body.classList.add("whs-apple-gate");
  document.getElementById("gatePair").classList.add("hidden");
  document.getElementById("gateSetup").classList.add("hidden");
  const apple = document.getElementById("gateApple");
  if (apple) apple.classList.remove("hidden");
  applyChrome();
  const err = document.getElementById("appleError");
  if (!schoolToken()) {
    if (err) err.textContent = t().appleNoSchool;
    return;
  }
  const slot = document.getElementById("apple-sign-in-placeholder");
  await waitForVisibleSlot(slot);
  try { await setupCloudAuth(); } catch (_) {}
  let ready = false;
  for (let i = 0; i < 80; i += 1) {
    const node = document.querySelector("#ck-auth .apple-auth-button, #ck-auth iframe");
    const rect = node ? node.getBoundingClientRect() : null;
    if (rect && rect.width > 40 && rect.height > 20) {
      ready = true;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
  if (ckWebAuthToken()) {
    if (err) err.textContent = t().appleSignOutFirst;
    watchAppleSignOut(epoch);
    return;
  }
  if (!ready && err) err.textContent = t().appleButtonMissing;
  else if (err) err.textContent = "";
  watchAppleSignIn(epoch);
}
function watchAppleSignOut(epoch) {
  try {
    const container = CloudKit.getDefaultContainer();
    if (container && typeof container.whenUserSignsOut === "function") {
      container.whenUserSignsOut().then(() => {
        if (epoch !== window._appleEpoch) return;
        window._ckUserRecordName = "";
        const err = document.getElementById("appleError");
        if (err) err.textContent = "";
        watchAppleSignIn(epoch);
      }).catch(() => {});
    }
  } catch (_) {}
  const wait = async () => {
    for (let i = 0; i < 400; i += 1) {
      if (epoch !== window._appleEpoch || window._gateStep !== "apple") return;
      if (!ckWebAuthToken()) {
        window._ckUserRecordName = "";
        const err = document.getElementById("appleError");
        if (err) err.textContent = "";
        watchAppleSignIn(epoch);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };
  wait();
}
function showRevokePassError(kind) {
  const c = t();
  const needApple = kind === "APPLE";
  openSheet(`
    <div class="card-title"><b>${needApple ? c.revokePassNeedApple : c.revokePassFail}</b><button type="button" data-action="closeSheet">${c.close}</button></div>`);
}
function confirmRevokePass(id) {
  if (!canRevokePass()) return;
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.revokePassTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.revokePassBody}</p>
    <button class="primary" type="button" data-action="closeSheet">${c.close}</button>
    <button class="ghost" type="button" data-action="revokePass" data-pass-id="${escapeHtml(id || "")}" style="width:100%;margin-top:8px;color:#B42318;">${c.revokePass}</button>`);
}
function watchAppleSignIn(epoch) {
  if (window._ckWatch) return;
  window._ckWatch = true;
  const ticket = epoch == null ? window._appleEpoch : epoch;
  try {
    CloudKit.getDefaultContainer().whenUserSignsIn().then((userInfo) => {
      window._ckWatch = false;
      if (window._gateStep === "apple" && ticket != null && ticket !== window._appleEpoch) return;
      const signedName = userNameFromInfo(userInfo);
      if (signedName) window._ckUserRecordName = signedName;
      const fromForm = pendingStaffFromForm();
      if (fromForm) window._pendingGuestStaff = fromForm;
      if (window._pendingGuestStaff) {
        finishPendingGuestStaff();
        watchAppleSignIn();
        return;
      }
      const id = window._pendingRevokeId;
      window._pendingRevokeId = "";
      const newsId = window._pendingDeleteNewsId;
      if (id) handleRevokePass(id);
      else if (newsId) deleteNewsPost(newsId);
      else if (window._pendingNewsPost) publishNewsPost();
      else if (window._pendingIssuePass) {
        window._pendingIssuePass = false;
        issuePassFromWeb();
      }
      watchAppleSignIn();
    }).catch(() => { window._ckWatch = false; });
  } catch (_) { window._ckWatch = false; }
}
function isAuthError(error, payload) {
  const text = [
    error && error.ckErrorCode,
    error && error.serverErrorCode,
    error && error.message,
    error && error.reason,
    payload && payload.serverErrorCode,
    payload && payload.reason
  ].filter(Boolean).join(" ");
  if (/ACCESS_DENIED|PERMISSION_FAILURE/i.test(text)) return false;
  return /AUTH|421|authorization|sign in/i.test(text);
}
function cloudRecordError(payload, record) {
  const row = record || {};
  const code = String((payload && payload.serverErrorCode) || row.serverErrorCode || (payload && payload.reason) || row.reason || "FAIL");
  const reason = String((payload && payload.reason) || row.reason || "");
  return Object.assign(new Error(code), {
    apple: isAuthError({ message: code + " " + reason }, payload),
    code,
    reason
  });
}
function tombstoneName(id) {
  return "cleared." + String(id || "").trim();
}
function revokedName(id) {
  return "revoked." + String(id || "").trim();
}
function isPassMarker(record) {
  const id = String((record && record.recordName) || "");
  const key = id.toLowerCase();
  const kind = String(fieldValue(record, "kind") || "").toLowerCase();
  if (!id || key === MANIFEST.toLowerCase() || key === CLEARED.toLowerCase() || key === CAMPUS_LOG.toLowerCase() || key === CAMPUS_CLEARED.toLowerCase() || key === NEWS_MANIFEST.toLowerCase()) return true;
  if (key.indexOf("cleared.") === 0 || key.indexOf("revoked.") === 0 || key.indexOf("news.") === 0 || key.indexOf("newsimg.") === 0 || key.indexOf("webpass.") === 0 || key.indexOf("passimg.") === 0 || key.indexOf("inbox.") === 0 || key.indexOf("body.") === 0) return true;
  if (isGateRecordName(id)) return true;
  if (kind === "cleared" || kind === "revoked" || kind === "news" || kind === "newsimg" || kind === "webpass" || kind === "passimg" || kind === "inbox" || kind === "staffgate" || kind === "wipegate" || kind === "staffuser" || kind === "manifest" || kind === "body" || kind === "nfchomework" || kind === "nfccourse") return true;
  return false;
}
function isRevokedFlag(record) {
  const raw = String(fieldValue(record, "revoked") || "").trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes" || raw === "revoked";
}
function collectClearedIDs(records) {
  const out = new Set();
  (records || []).forEach((record) => {
    const id = String(record.recordName || "");
    const key = id.toLowerCase();
    const kind = String(fieldValue(record, "kind") || "").toLowerCase();
    if (key === CLEARED.toLowerCase() || kind === "cleared") {
      parsePassIDs(fieldValue(record, "passIDs")).forEach((item) => out.add(item.toLowerCase()));
    }
    if (key.indexOf("cleared.") === 0) out.add(key.slice("cleared.".length));
  });
  return out;
}
function collectRevokedIDs(records) {
  const out = new Set();
  (records || []).forEach((record) => {
    const id = String(record.recordName || "");
    const key = id.toLowerCase();
    const kind = String(fieldValue(record, "kind") || "").toLowerCase();
    if (key === CLEARED.toLowerCase() || kind === "cleared" || kind === "revoked") {
      parsePassIDs(fieldValue(record, "passIDs")).forEach((item) => out.add(item.toLowerCase()));
    }
    if (key.indexOf("cleared.") === 0) out.add(key.slice("cleared.".length));
    if (key.indexOf("revoked.") === 0) out.add(key.slice("revoked.".length));
    if (!isPassMarker(record) && isRevokedFlag(record)) out.add(key);
  });
  return out;
}
function passIsRevoked(record) {
  const id = passRecordName(record).toLowerCase();
  if (isRevokedFlag(record)) return true;
  return !!(window._revokedPassIDs && window._revokedPassIDs.has(id));
}
async function ckDeleteNames(names) {
  if (!ckWebAuthToken()) return false;
  const db = cloudDb();
  if (!(db && names.length && typeof db.deleteRecords === "function")) return false;
  const result = await db.deleteRecords(names);
  if (result && result.hasErrors) return false;
  return true;
}
async function ckCreateRecords(records) {
  if (!ckWebAuthToken()) return false;
  const db = cloudDb();
  if (!(db && records.length && typeof db.saveRecords === "function")) return false;
  const result = await db.saveRecords(records);
  if (result && result.hasErrors) return false;
  return true;
}
function parsePassIDs(raw) {
  return String(raw || "").split(",").map((part) => part.trim()).filter(Boolean);
}
function capNewestIDs(existing, id, limit) {
  const ids = (existing || []).slice();
  const token = String(id || "").trim();
  if (token && !ids.some((item) => item.toLowerCase() === token.toLowerCase())) ids.unshift(token);
  const cap = Math.max(1, limit || 400);
  return ids.slice(0, cap);
}
function isConflictError(error) {
  const text = [error && error.code, error && error.message, error && error.reason, error && error.serverErrorCode].filter(Boolean).join(" ");
  return /CONFLICT|serverRecordChanged|ATOMIC_ERROR/i.test(text);
}
async function loadClearedIDs(passIDs) {
  const names = [CLEARED]
    .concat((passIDs || []).map(tombstoneName))
    .concat((passIDs || []).map(revokedName));
  try {
    return collectRevokedIDs(await fetchByNames(cloudDb(), names));
  } catch (_) {
    return new Set();
  }
}
async function restDeleteNames(names) {
  if (!names.length) return false;
  const payload = await restModifyOps(names.map((recordName) => ({
    operationType: "forceDelete",
    record: { recordName }
  })));
  if (isAuthError(null, payload)) throw Object.assign(new Error("APPLE"), { apple: true });
  return (payload.records || []).some((row) => row && (row.deleted || !row.serverErrorCode));
}
async function markPassesRevoked(ids) {
  const unique = [...new Set((ids || []).map((id) => String(id || "").trim()).filter((id) => id && id !== MANIFEST && id !== CLEARED))];
  if (!unique.length) return false;
  const records = unique.map((id) => ({
    recordType: PASS_TYPE,
    recordName: revokedName(id),
    fields: {
      kind: { value: "revoked" },
      passIDs: { value: id }
    }
  }));
  try {
    if (await ckCreateRecords(records)) return true;
  } catch (error) {
    if (isAuthError(error)) throw Object.assign(new Error("APPLE"), { apple: true });
  }
  for (const record of records) {
    try {
      await restModify(record, "create");
    } catch (error) {
      if (isAuthError(error)) throw Object.assign(new Error("APPLE"), { apple: true });
      try {
        await restModify(record, "forceUpdate");
      } catch (retry) {
        if (isAuthError(retry)) throw Object.assign(new Error("APPLE"), { apple: true });
        return false;
      }
    }
  }
  return true;
}
// Staff activity log for school audits. Each entry is a WHSAuditLog record: what was done, which pass
// IDs, and from where. CloudKit stamps who created it and when. Entries hold no student names, and
// staff can't change or delete them (Create-only in CloudKit Dashboard).
const AUDIT_TYPE = "WHSAuditLog";
let lastAuditLogView = 0;
async function auditLog(action, passIDs, count) {
  try {
    if (!verifiedStaffRole() || !ckWebAuthToken()) return;
    if (action === "view_log") {
      if (Date.now() - lastAuditLogView < 10 * 60 * 1000) return;
      lastAuditLogView = Date.now();
    }
    const ids = (passIDs || []).map((id) => String(id || "").trim()).filter(Boolean);
    const actor = String((profile && (profile.displayName || profile.firstName)) || "").slice(0, 80);
    await restModify({
      recordType: AUDIT_TYPE,
      recordName: "audit." + crypto.randomUUID(),
      fields: {
        action: { value: action },
        passIDs: { value: ids.slice(0, 60).join(",") },
        count: { value: Number.isFinite(count) ? count : ids.length },
        actor: { value: actor },
        platform: { value: "web" }
      }
    }, "create");
  } catch (_) {}
}
// Audit log viewer (administrators only). Entries come straight from CloudKit with the admin's own
// Apple sign-in; anyone without the WHSAdmin role gets ACCESS_DENIED from CloudKit.
// Every value is escaped before display. The "who" line shows the Apple ID CloudKit recorded,
// because the typed staff name in an entry could be anything.
function renderAuditLog() {
  const c = t();
  const node = document.getElementById("view-audit");
  if (!node) return;
  node.innerHTML = `${backBar()}
    <div class="card wide">
      <div class="t">${escapeHtml(c.auditTitle)}</div>
      <p class="muted" style="margin:6px 0 10px;">${escapeHtml(c.auditIntro)}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
        <button class="ghost" type="button" data-action="auditRefresh">${escapeHtml(c.refresh)}</button>
      </div>
      <input class="search" id="auditQuery" placeholder="${escapeHtml(c.auditSearch)}" autocomplete="off" spellcheck="false">
    </div>
    <div id="auditList"><p class="muted">${escapeHtml(c.auditLoading)}</p></div>`;
  auditLog("view_audit");
  loadAuditLog(true);
}
async function loadAuditLog(reset) {
  if (!canSeeAuditLog() || window._auditBusy) return;
  const c = t();
  if (reset) { window._auditEntries = []; window._auditMarker = null; }
  if (!reset && !window._auditMarker) return;
  window._auditBusy = true;
  let message = "";
  try {
    if (!ckWebAuthToken()) throw Object.assign(new Error("APPLE"), { code: "APPLE" });
    const body = {
      query: { recordType: AUDIT_TYPE, sortBy: [{ systemFieldName: "createdTimestamp", ascending: false }] },
      resultsLimit: 100,
      desiredKeys: ["action", "passIDs", "count", "actor", "platform"]
    };
    if (window._auditMarker) body.continuationMarker = window._auditMarker;
    const response = await fetch(restPublicUrl("records/query", false), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const payload = await response.json().catch(() => ({}));
    const code = String(payload.serverErrorCode || "");
    if (code) throw Object.assign(new Error(code), { code });
    (payload.records || []).forEach((record) => {
      if (!record || record.recordType !== AUDIT_TYPE) return;
      window._auditEntries.push({
        when: Number((record.created && record.created.timestamp) || 0),
        who: String((record.created && record.created.userRecordName) || ""),
        action: String(fieldValue(record, "action") || ""),
        passIDs: String(fieldValue(record, "passIDs") || ""),
        count: Number(fieldValue(record, "count") || 0),
        actor: String(fieldValue(record, "actor") || ""),
        platform: String(fieldValue(record, "platform") || "")
      });
    });
    window._auditMarker = payload.continuationMarker || null;
  } catch (error) {
    const code = String((error && error.code) || "");
    if (code === "APPLE" || /AUTHENTICATION/.test(code)) message = c.auditNeedApple;
    else if (/ACCESS_DENIED|PERMISSION/.test(code)) message = c.auditDenied;
    else if (/BAD_REQUEST/.test(code)) message = c.auditNeedIndex;
    else message = c.auditFail;
  } finally {
    window._auditBusy = false;
  }
  paintAuditLog(message);
}
function auditActionLabel(action) {
  const c = t();
  return ({
    view_log: c.auditViewLog,
    issue_pass: c.auditIssue,
    revoke_pass: c.auditRevoke,
    clear_log: c.auditClear,
    view_audit: c.auditViewAudit
  })[action] || action;
}
function paintAuditLog(message) {
  const c = t();
  const list = document.getElementById("auditList");
  if (!list || view !== "audit") return;
  if (message) {
    list.innerHTML = `<div class="card wide"><p class="error" style="margin:0;">${escapeHtml(message)}</p></div>`;
    return;
  }
  const q = String((document.getElementById("auditQuery") || {}).value || "").trim().toLowerCase();
  const entries = (window._auditEntries || []).filter((entry) => {
    if (!q) return true;
    return [auditActionLabel(entry.action), entry.actor, entry.who, entry.platform, entry.passIDs].join(" ").toLowerCase().includes(q);
  });
  if (!entries.length) {
    list.innerHTML = `<div class="card wide"><p class="muted" style="margin:0;">${escapeHtml(c.auditEmpty)}</p></div>`;
    return;
  }
  const rows = entries.map((entry) => {
    const when = entry.when ? new Date(entry.when).toLocaleString(lang === "es" ? "es-US" : "en-US") : "";
    const ids = entry.passIDs.split(",").map((id) => id.trim()).filter(Boolean);
    const shownIDs = ids.slice(0, 3).map((id) => id.slice(0, 8)).join(", ") + (ids.length > 3 ? ` +${ids.length - 3}` : "");
    const appleID = entry.who ? `${c.auditAppleID} …${entry.who.slice(-8)}` : "";
    return `<div class="card wide" style="padding:12px 16px;">
        <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;">
          <b>${escapeHtml(auditActionLabel(entry.action))}</b>
          <span class="muted">${escapeHtml(when)}</span>
        </div>
        <div class="s">${escapeHtml(entry.actor || c.auditUnknown)}${appleID ? " · " + escapeHtml(appleID) : ""}${entry.platform ? " · " + escapeHtml(entry.platform) : ""}</div>
        ${entry.count ? `<div class="s">${escapeHtml(c.auditPasses)}: ${escapeHtml(String(entry.count))}${shownIDs ? " · " + escapeHtml(shownIDs) : ""}</div>` : ""}
      </div>`;
  }).join("");
  const more = window._auditMarker ? `<button class="ghost" type="button" data-action="auditMore" style="width:100%;margin-top:8px;">${escapeHtml(c.auditMore)}</button>` : "";
  list.innerHTML = rows + more;
}
async function revokePassRecord(id) {
  const unique = String(id || "").trim();
  if (!unique || unique === MANIFEST || unique === CLEARED) return;
  watchAppleSignIn();
  auditLog("revoke_pass", [unique]);
  const existing = (window._passRecords || {})[unique];
  const patch = {
    recordType: PASS_TYPE,
    recordName: unique,
    fields: { revoked: { value: 1 } }
  };
  if (existing && existing.recordChangeTag) patch.recordChangeTag = existing.recordChangeTag;
  try {
    await ckCreateRecords([patch]);
  } catch (error) {
    if (isAuthError(error) && !ckWebAuthToken()) throw Object.assign(new Error("APPLE"), { apple: true });
  }
  try {
    await restModify(patch, "forceUpdate");
  } catch (error) {
    if (isAuthError(error) && !ckWebAuthToken()) throw Object.assign(new Error("APPLE"), { apple: true });
  }
  if (!(await markPassesRevoked([unique]))) {
    throw Object.assign(new Error(ckWebAuthToken() ? "FAIL" : "APPLE"), { apple: !ckWebAuthToken() });
  }
}
async function handleRevokePass(id) {
  if (!canRevokePass()) return;
  try {
    await ensureCloud();
    watchAppleSignIn();
    if (!(await ensureSavedStaffSession())) throw Object.assign(new Error("APPLE"), { apple: true });
    await requireEnrolledStaff();
    await revokePassRecord(id);
    closeSheet();
    if (view === "passes") await loadPasses();
  } catch (error) {
    window._pendingRevokeId = id;
    const apple = (error && error.apple) || error.message === "APPLE" || isAuthError(error);
    showRevokePassError(apple ? "APPLE" : "FAIL");
  }
}
function setPassWipeError(message) {
  const err = document.getElementById("passWipeError");
  const ok = document.getElementById("passWipeOk");
  if (err) err.textContent = message || "";
  if (ok) ok.classList.toggle("hidden", !!message);
}
async function confirmClearPassLog() {
  if (!canClearPassLog()) return;
  const c = t();
  const typed = String((document.getElementById("passWipeCode") || {}).value || "").trim().toUpperCase();
  if (typed !== "CLEAR") {
    setPassWipeError(c.adminPassWipeBadCode);
    return;
  }
  setPassWipeError("");
  openSheet(`
    <div class="card-title"><b>${c.adminPassWipeConfirmTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p>${c.adminPassWipeConfirmBody}</p>
    <p class="muted">${c.adminPassWipeBody}</p>
    <button class="ghost" type="button" data-action="closeSheet" style="width:100%;">${c.adminPassWipeCancel}</button>
    <button class="primary" type="button" data-action="clearPassLog" style="width:100%;margin-top:8px;background:#B42318;">${c.adminPassWipeConfirm}</button>`);
}
function showWorkProgress(percent, title, step, detail, finished, closeAction) {
  const c = t();
  const pct = Math.max(0, Math.min(100, Math.round(percent || 0)));
  const action = closeAction || "closeSheet";
  const close = finished
    ? `<button type="button" data-action="${action}">${c.close}</button>`
    : `<span class="wipe-pct">${pct}%</span>`;
  openSheet(`
    <div class="card-title"><b>${title}</b>${close}</div>
    <p class="muted">${step || ""}</p>
    <div class="wipe-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div class="wipe-fill" style="width:${pct}%"></div></div>
    <p class="wipe-pct">${pct}%</p>
    ${detail ? `<p class="muted">${escapeHtml(detail)}</p>` : ""}
    ${finished ? `<button class="primary" type="button" data-action="${action}" style="width:100%;margin-top:8px;">${c.close}</button>` : ""}`);
}
function showPassWipeProgress(percent, step, detail, finished, failed) {
  const c = t();
  showWorkProgress(percent, finished ? (failed ? c.adminPassWipeFail : c.adminPassWipeDone) : c.adminPassWipeWorking, step, detail, finished, "finishPassWipe");
}
async function emptyPassManifest() {
  await storePassIndex(CAMPUS_LOG, MANIFEST, "manifest", [], false);
}
async function saveClearedPassIDs(ids) {
  const unique = [...new Set((ids || []).map((id) => String(id || "").trim()).filter(Boolean))];
  const existing = await readExact(CAMPUS_CLEARED) || await readExact(CLEARED);
  const merged = [...new Set(indexIDs(existing).concat(unique))];
  await storePassIndex(CAMPUS_CLEARED, CLEARED, "cleared", merged, true);
}
// Pass IDs from the staff copies of passes, newest first. This replaces the shared list every
// teacher used to edit, so teachers only create records and only admins change other people's.
// Needs Queryable "kind" and Sortable "createdTimestamp" indexes on WHSCampusLog. Only staff can
// read those records. Returns null when CloudKit can't run the query.
async function queryStaffPassIDs(maxCount) {
  if (!ckWebAuthToken()) return null;
  for (const sorted of [true, false]) {
    const ids = [];
    let marker = null;
    let ok = true;
    for (let page = 0; page < 200 && ids.length < maxCount; page += 1) {
      const query = {
        recordType: CAMPUS_TYPE,
        filterBy: [{ fieldName: "kind", comparator: "EQUALS", fieldValue: { value: "body" } }]
      };
      if (sorted) query.sortBy = [{ systemFieldName: "createdTimestamp", ascending: false }];
      const body = { query, resultsLimit: Math.min(200, maxCount - ids.length), desiredKeys: ["kind"] };
      if (marker) body.continuationMarker = marker;
      let payload = {};
      try {
        const response = await fetch(restPublicUrl("records/query", false), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        payload = await response.json().catch(() => ({}));
        if (!response.ok || payload.serverErrorCode) { ok = page > 0; break; }
      } catch (_) { ok = page > 0; break; }
      (payload.records || []).forEach((record) => {
        const name = String(record.recordName || "");
        if (name.indexOf("body.") === 0) ids.push(name.slice(5));
      });
      marker = payload.continuationMarker;
      if (!marker) break;
    }
    if (ok) return ids.slice(0, maxCount);
  }
  return null;
}
async function collectCampusPassIDs() {
  const names = new Set();
  ((await queryStaffPassIDs(20000)) || []).forEach((id) => names.add(id));
  try {
    const campus = await readExact(CAMPUS_LOG);
    const manifest = campus || await readExact(MANIFEST);
    indexIDs(manifest).forEach((id) => names.add(id));
  } catch (_) {}
  try { indexIDs(await readExact(CAMPUS_ARCHIVE)).forEach((id) => names.add(id)); } catch (_) {}
  (window._passLogList || []).forEach((record) => {
    const id = passRecordName(record);
    if (id) names.add(id);
  });
  return [...names].filter((id) => {
    if (!id || id === MANIFEST || id === CLEARED || isGateRecordName(id)) return false;
    return true;
  });
}
// Clearing means deleting: remove each pass, its staff copy, and its images.
// Only the empty "revoked." markers stay, so student devices drop their copies.
async function deletePassData(ids) {
  const names = [];
  ids.forEach((id) => names.push(id, "body." + id, "seal." + id));
  for (let start = 0; start < ids.length; start += 180) {
    let heads = [];
    try { heads = await restLookupExact(ids.slice(start, start + 180).map((id) => "passimg." + id + ".0")); } catch (_) {}
    heads.forEach((record) => {
      const base = passRecordName(record).replace(/\.0$/, "");
      if (!base) return;
      const count = Math.min(Math.max(parseInt(fieldValue(record, "dates"), 10) || 1, 1), 200);
      for (let i = 0; i < count; i += 1) names.push(base + "." + i);
    });
  }
  names.push(CAMPUS_ARCHIVE);
  for (let start = 0; start < names.length; start += 40) {
    const ops = names.slice(start, start + 40).map((recordName) => ({ operationType: "forceDelete", record: { recordName } }));
    try { await restModifyOps(ops); } catch (_) {}
  }
}
async function handleClearPassLog() {
  if (!canClearPassLog() || window._passWipeBusy) return;
  const c = t();
  const typed = String((document.getElementById("passWipeCode") || {}).value || "").trim().toUpperCase();
  if (typed !== "CLEAR") {
    window._passWipeBusy = false;
    setPassWipeError(c.adminPassWipeBadCode);
    closeSheet();
    return;
  }
  window._passWipeBusy = true;
  let ids = [];
  try {
    showPassWipeProgress(4, c.adminPassWipeStepCollect, "", false, false);
    await ensureCloud();
    watchAppleSignIn();
    if (!(await ensureSavedStaffSession())) throw Object.assign(new Error("APPLE"), { apple: true });
    const role = await requireEnrolledStaff();
    if (role !== "administrator") throw Object.assign(new Error("FAIL"), { reason: "staff" });
    showPassWipeProgress(10, c.adminPassWipeStepCollect, "", false, false);
    ids = await collectCampusPassIDs();
    await auditLog("clear_log", ids, ids.length);
    if (ids.length) {
      showPassWipeProgress(18, c.adminPassWipeStepRevoke, `${c.adminPassWipeCount} 0 / ${ids.length}`, false, false);
      await markPassesRevoked(ids);
      const patches = ids.map((id) => ({
        recordType: PASS_TYPE,
        recordName: id,
        fields: { revoked: { value: 1 } }
      }));
      for (let i = 0; i < patches.length; i += 40) {
        const slice = patches.slice(i, i + 40);
        try {
          await restModifyOps(slice.map((record) => ({ operationType: "forceUpdate", record })));
        } catch (_) {
          for (const record of slice) {
            try { await revokePassRecord(record.recordName); } catch (_) {}
          }
        }
        const done = Math.min(ids.length, i + slice.length);
        const pct = 18 + Math.round((done / ids.length) * 62);
        showPassWipeProgress(pct, c.adminPassWipeStepRevoke, `${c.adminPassWipeCount} ${done} / ${ids.length}`, false, false);
      }
      showPassWipeProgress(84, c.adminPassWipeStepClear, `${c.adminPassWipeCount} ${ids.length} / ${ids.length}`, false, false);
      await saveClearedPassIDs(ids);
    }
    showPassWipeProgress(92, c.adminPassWipeStepEmpty, "", false, false);
    await emptyPassManifest();
    if (ids.length) await deletePassData(ids);
    window._passLogList = [];
    window._revokedPassIDs = new Set(ids.map((id) => id.toLowerCase()));
    window._clearedPassIDs = new Set(ids.map((id) => id.toLowerCase()));
    const ok = document.getElementById("passWipeOk");
    if (ok) {
      ok.textContent = c.adminPassWipeDone;
      ok.classList.remove("hidden");
    }
    setPassWipeError("");
    const code = document.getElementById("passWipeCode");
    if (code) code.value = "";
    window._passWipeProof = "";
    if (view === "passes") await loadPasses();
    window._passWipeBusy = false;
    showPassWipeProgress(100, c.adminPassWipeDone, "", true, false);
  } catch (error) {
    window._passWipeBusy = false;
    const apple = (error && error.apple) || error.message === "APPLE" || isAuthError(error);
    const message = apple ? c.adminPassWipeNeedApple : c.adminPassWipeFail;
    showPassWipeProgress(100, message, "", true, true);
    setPassWipeError(message);
  }
}
function finishPassWipe() {
  window._passWipeBusy = false;
  window._passWipeProof = "";
  closeSheet();
  if (view === "more") renderMore();
}
function finishIssuePass() {
  window._issuePassBusy = false;
  closeSheet();
}
async function allocateGuestStudentKey(person) {
  if (!schoolToken() || !ckWebAuthToken()) return "";
  try { await ensureCloud(); } catch (_) {}
  for (let i = 0; i < 8; i += 1) {
    const key = makeWebUnlockKey();
    let existing = [];
    try { existing = await restLookup([key]); } catch (_) { existing = []; }
    if (existing.length) continue;
    const sealedGrade = await sealText(key, String(person.grade || ""));
    const fields = {
      displayName: { value: person.displayName || person.firstName || "Warrior" },
      firstName: { value: person.firstName || person.displayName || "" },
      role: { value: "student" }
    };
    if (String(sealedGrade).indexOf("whs1.") === 0) fields.gradeSeal = { value: sealedGrade };
    try {
      await restModify({
        recordType: "WHSWebProfile",
        recordName: key,
        fields
      }, "create");
      return key;
    } catch (_) {}
  }
  return "";
}
async function ensureGuestStudentProfile() {
  if (!isGuestStudent() || hasWebKey()) return;
  const key = await allocateGuestStudentKey(profile || {});
  if (!key || !profile) return;
  profile.key = key;
  profile.guest = true;
  if (!profile.role || profile.role === "guest") profile.role = "student";
  localStorage.setItem("whsWebProfile", JSON.stringify(profile));
}
function askResetWebCode() {
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.webCodeResetTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.webCodeResetBody}</p>
    <p class="error" id="webCodeResetError"></p>
    <button class="primary" type="button" data-action="closeSheet">${c.webCodeResetCancel}</button>
    <button class="ghost" type="button" data-action="confirmResetWebCode" id="confirmResetWebCode" style="width:100%;margin-top:8px;color:#B42318;">${c.webCodeResetConfirm}</button>`);
}
// Gives a web-only student a new code: saves the profile under the new code, then deletes
// everything stored under the old one. (Students with the iPhone app reset it in the app.)
async function resetWebCode() {
  if (!isGuestStudent() || !hasWebKey() || window._webCodeResetBusy) return;
  const c = t();
  const err = document.getElementById("webCodeResetError");
  const button = document.getElementById("confirmResetWebCode");
  const old = { ...profile };
  if (old.cloudSaved && !ckWebAuthToken()) {
    if (err) err.textContent = c.webCodeResetNeedApple;
    return;
  }
  window._webCodeResetBusy = true;
  if (button) { button.disabled = true; button.textContent = c.webCodeResetWorking; }
  try {
    let next = "";
    if (ckWebAuthToken()) {
      next = await allocateGuestStudentKey({ displayName: old.displayName, firstName: old.firstName, grade: old.grade });
      if (!next) throw new Error("FAIL");
    } else {
      // Never saved to the school site, so the code only lives in this browser.
      do { next = makeWebUnlockKey(); } while (next === normalizeCode(old.key));
    }
    // Sign-in was checked above, so this removes the old profile, passes, and seals.
    if (old.cloudSaved) await eraseOwnedProfileRecords(old);
    profile.key = next;
    profile.cloudSaved = !!ckWebAuthToken();
    localStorage.setItem("whsWebProfile", JSON.stringify(profile));
    dropPassFieldCache();
    window._studentPassUsable = [];
    closeSheet();
    renderMore();
  } catch (_) {
    if (err) err.textContent = c.webCodeResetFail;
    if (button) { button.disabled = false; button.textContent = c.webCodeResetConfirm; }
  } finally {
    window._webCodeResetBusy = false;
  }
}
// The code is a password, so it starts hidden each time the More tab opens. While hidden, the page
// holds only a blurred placeholder, never the real code.
const WEB_CODE_MASK = "XXXXX-XXXXX";
function webCodeValueHTML() {
  const shown = !!window._webCodeShown;
  const label = shown ? "" : ` aria-label="${escapeHtml(t().webCodeHiddenLabel)}"`;
  return `<div class="s web-code${shown ? "" : " is-hidden"}" id="webCodeValue"${label}>${shown ? escapeHtml(formatWebKey(profile.key)) : WEB_CODE_MASK}</div>`;
}
function setWebCodeShown(shown) {
  window._webCodeShown = !!shown;
  const value = document.getElementById("webCodeValue");
  if (value) value.outerHTML = webCodeValueHTML();
  const button = document.getElementById("toggleWebCode");
  if (button) button.textContent = shown ? t().webCodeHide : t().webCodeShow;
}
function guestWebCodeCard() {
  const c = t();
  if (!isGuestStudent() || !hasWebKey()) return "";
  return `<div class="card wide">
      <div class="t">${c.webCodeTitle}</div>
      ${webCodeValueHTML()}
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="ghost" type="button" data-action="toggleWebCode" id="toggleWebCode" aria-controls="webCodeValue">${window._webCodeShown ? c.webCodeHide : c.webCodeShow}</button>
        <button class="ghost" type="button" data-action="copyWebCode" id="copyWebCode">${c.webCodeCopy}</button>
        <button class="ghost" type="button" data-action="askResetWebCode" style="color:#B42318;">${c.webCodeReset}</button>
      </div>
    </div>`;
}
async function fetchByNames(db, names) {
  try {
    const looked = await restLookupDetailed(names, false);
    if (looked.complete || looked.records.length) return looked.records;
  } catch (_) {}
  const unique = [...new Set(names.filter(Boolean).flatMap(lookupNames))];
  if (!unique.length) return [];
  const found = [];
  const remember = (record) => {
    if (!usableRecord(record)) return;
    const id = record.recordName || "";
    if (id && found.some((item) => item.recordName === id)) return;
    found.push(record);
  };
  if (db && typeof db.fetchRecord === "function") {
    for (const name of unique) {
      try { recordsFrom(await db.fetchRecord(name)).forEach(remember); } catch (_) {}
    }
    if (found.length) return found;
  }
  if (db && typeof db.fetchRecords === "function") {
    const attempts = [unique, unique.map((recordName) => ({ recordName })), { records: unique.map((recordName) => ({ recordName })) }];
    for (const argument of attempts) {
      try { recordsFrom(await db.fetchRecords(argument)).forEach(remember); } catch (_) {}
      if (found.length) return found;
    }
  }
  return found;
}

function showGate() {
  const inProfile = signedIn();
  gate.classList.toggle("hidden", inProfile);
  gate.toggleAttribute("hidden", inProfile);
  if (!inProfile) showPairStep();
  applyChrome();
}

function applyChrome() {
  const c = t();
  const name = profile ? profile.displayName : "";
  hello.textContent = greeting(name);
  dateLine.textContent = new Date().toLocaleDateString(lang === "es" ? "es" : "en", {
    weekday: "long", month: "long", day: "numeric"
  });
  applyAvatar(window._profilePhoto || "");
  const roleText = roleLabel();
  const gradeText = profile && profile.grade ? `${c.grade} ${profile.grade}` : "";
  roleLine.textContent = [roleText, gradeText].filter(Boolean).join(" · ");
  roleLine.classList.toggle("hidden", !roleText);
  if (window._gateStep === "guest") {
    gateTitle.textContent = c.guestTitle;
    gateBody.textContent = c.guestBody;
  } else if (window._gateStep === "apple") {
    gateTitle.textContent = c.appleStepTitle;
    gateBody.textContent = c.appleStepBody;
  } else {
    gateTitle.textContent = c.welcome;
    gateBody.textContent = c.gateBody;
  }
  codeLabel.textContent = c.codeLabel;
  const nameLabel = document.getElementById("nameLabel");
  const gradeLabel = document.getElementById("gradeLabel");
  const rolePickLabel = document.getElementById("rolePickLabel");
  const staffCodeLabel = document.getElementById("staffCodeLabel");
  const roleOptStudent = document.getElementById("roleOptStudent");
  const roleOptTeacher = document.getElementById("roleOptTeacher");
  const roleOptAdmin = document.getElementById("roleOptAdmin");
  if (nameLabel) nameLabel.textContent = c.nameLabel;
  if (gradeLabel) gradeLabel.textContent = c.gradeLabel;
  if (rolePickLabel) rolePickLabel.textContent = c.role;
  if (staffCodeLabel) staffCodeLabel.textContent = c.staffCodeLabel;
  if (roleOptStudent) roleOptStudent.textContent = c.roleStudent;
  if (roleOptTeacher) roleOptTeacher.textContent = c.roleTeacher;
  if (roleOptAdmin) roleOptAdmin.textContent = c.admin;
  syncGuestRoleFields();
  const guestFinish = document.getElementById("guestFinish");
  if (guestFinish) guestFinish.textContent = c.enter;
  enterSite.textContent = c.enter;
  const skip = document.getElementById("skipSite");
  if (skip) skip.textContent = c.skip;
  const guestTitle = document.getElementById("guestTitle");
  const guestBody = document.getElementById("guestBody");
  if (guestTitle) guestTitle.textContent = c.guestTitle;
  if (guestBody) guestBody.textContent = c.guestBody;
  document.getElementById("bell").innerHTML = icons.bell;
  const booksIco = '<img class="tab-glyph" src="./books-vertical.png" alt="">';
  const contactsIco = '<span class="tab-glyph tone" style="--glyph:url(./person-crop-rectangle-stack.png)"></span>';
  const tabItems = [["home", icons.house, c.home]];
  if (isPairedStudent() || isGuestStudent()) tabItems.push(["classes", booksIco, c.classes]);
  if (canPostNews()) tabItems.push(["posts", icons.mega, c.postsNav]);
  tabItems.push(["contacts", contactsIco, c.contacts], ["more", icons.more, c.more]);
  tabs.classList.toggle("with-classes", tabItems.length > 3);
  const tabOn = (id) => {
    if (id === "classes") return view === "classes" || view === "class" || view === "study";
    return view === id;
  };
  tabs.innerHTML = `<button type="button" class="web-mark" data-go="home"><img src="./app-icon-192.png" alt=""><span>WebView</span></button>` + tabItems.map(([id, ico, label]) => `<button type="button" data-view="${id}" class="${tabOn(id) ? "on" : ""}"><span class="ico">${ico}</span>${label}</button>`).join("");
}

function show(id) {
  view = id;
  if (id !== "study") document.body.classList.remove("ql-open");
  closeSheet();
  ["home", "news", "lunch", "contacts", "more", "posts", "passes", "audit", "issuepass", "mypasses", "swipe", "classes", "class", "study"].forEach((name) => {
    const node = document.getElementById("view-" + name);
    if (node) node.classList.toggle("hidden", name !== id);
  });
  applyChrome();
  if (profile && profile.key) loadProfilePhoto();
  if (id === "home") {
    renderHome();
    loadNewsFeed();
    if (isPairedStudent()) {
      loadSwipeCard();
      loadStudentPasses();
      loadStudy();
    } else if (isGuestStudent()) {
      loadSwipeCard();
      loadStudy();
      if (!hasWebKey()) {
        ensureGuestStudentProfile().then(() => {
          if (view === "home") {
            renderHome();
            loadSwipeCard();
            loadStudentPasses();
            loadStudy();
          }
          if (view === "more") renderMore();
        });
      } else if (canSeeOwnPasses()) {
        loadStudentPasses();
      }
    } else if (canSeeOwnPasses()) {
      loadStudentPasses();
    }
  }
  if (id === "swipe") loadSwipeCard();
  if (id === "mypasses") loadStudentPasses();
  if (id === "classes" || id === "class") loadStudy();
  if (id === "study") renderStudy();
  if (id === "news") loadNews();
  if (id === "lunch") renderLunch();
  if (id === "contacts") renderStaff(document.getElementById("staffQuery") ? document.getElementById("staffQuery").value : "");
  if (id === "more") {
    window._webCodeShown = false;
    renderMore();
  }
  if (id === "posts") {
    if (!canPostNews()) {
      show("home");
      return;
    }
    renderPosts();
    loadNewsFeed();
  }
  if (id === "audit") {
    if (!canSeeAuditLog()) {
      show("more");
      return;
    }
    renderAuditLog();
  }
  if (id === "passes") {
    if (!showPassMenu()) {
      show("home");
      return;
    }
    if (!canSeePassLog()) {
      const node = document.getElementById("view-passes");
      node.innerHTML = `${backBar()}<div class="card wide"><p class="muted">${t().appleStepBody}</p></div>`;
      syncStaffRoleFromCloud().then(() => {
        if (view !== "passes") return;
        if (canSeePassLog()) loadPasses();
        else showAppleStep();
      }).catch(() => { if (view === "passes") showAppleStep(); });
      return;
    }
    loadPasses();
  }
  if (id === "issuepass") {
    if (!canIssuePass()) {
      show("home");
      return;
    }
    renderIssuePass();
  }
}

function backBar() {
  return `<div class="toolbar"><button class="ghost" type="button" data-view="home">${t().back}</button></div>`;
}

function dashCard(go, title, subtitle) {
  return `<button class="card action" type="button" data-go="${go}"><div class="t">${title}</div>${subtitle ? `<div class="s">${subtitle}</div>` : ""}</button>`;
}
function homeLunchWireNews() {
  const c = t();
  return `<div class="shortcuts wide">
        <button class="shortcut" type="button" data-go="lunch">
          <span class="plate"><img class="sf-glyph" src="./fork-knife.png" alt=""></span>
          <div class="t">${c.lunchMenu}</div>
          <div class="s">${c.lunchSub}</div>
        </button>
        <a class="shortcut" href="https://whswarriorswire.com" target="_blank" rel="noopener">
          <img class="tile-wire" src="./WarriorsWire.png" alt="">
          <div class="t">${c.wire}</div>
          <div class="s">${c.wireSub}</div>
        </a>
      </div>
      <div class="card wide" id="homeNews"><div class="t">${c.newsFeed}</div></div>`;
}
function renderHome() {
  const c = t();
  const role = currentRole();
  let cards = "";
  if (role === "parent") {
    cards = `
      <div class="card wide"><p class="muted" style="margin:0;">${c.dashParent}</p></div>
      ${dashCard("news", c.openNews, "")}
      ${dashCard("lunch", c.openLunch, "")}
      ${dashCard("contacts", c.openContacts, "")}`;
  } else if (showPassMenu()) {
    cards = `
      <button class="card action hero-pass wide" type="button" data-go="passes">
        <div class="row-item">
          <img class="tile-mark" src="./FlexHallwayMark.png" alt="">
          <div><div class="t">${c.passesTile}</div></div>
          <span class="chev">›</span>
        </div>
      </button>
      ${homeLunchWireNews()}`;
  } else {
    const passTile = `<button class="card action hero-pass wide" type="button" data-go="mypasses">
        <div class="row-item">
          <img class="tile-mark" src="./FlexHallwayMark.png" alt="">
          <div><div class="t">${c.passesTile}</div><div class="s" id="passTileSub">${c.noneYet}</div></div>
          <span class="chev">›</span>
        </div>
      </button>`;
    const swipeTile = `<button class="card action hero-pass wide" type="button" data-go="swipe">
        <div class="row-item">
          <img class="tile-swipe" id="swipeTileMark" src="./SwipeCard.png" alt="">
          <div><div class="t">${c.swipe}</div><div class="s" id="swipeTileSub">${c.swipeSub}</div></div>
          <span class="chev">›</span>
        </div>
      </button>`;
    cards = `
      ${isPairedStudent() ? `${swipeTile}
      ${passTile}` : (isGuestStudent() ? `${swipeTile}${canSeeOwnPasses() ? passTile : ""}` : "")}
      ${homeLunchWireNews()}`;
  }
  document.getElementById("view-home").innerHTML = `<div class="dash">${cards}</div>`;
}

function renderLunch() {
  const node = document.getElementById("view-lunch");
  const c = t();
  node.innerHTML = `${backBar()}
    <div class="card wide" style="max-width:920px;">
      <div class="t">${c.lunchMenu}</div>
      <p class="muted">${c.lunchSub}</p>
      <iframe class="lunch" title="${c.lunchMenu}" src="./WHSLunchMenu.pdf?v=2026-11"></iframe>
      <p class="muted"><a href="${LUNCH}" target="_blank" rel="noopener">${c.lunchMenu}</a></p>
    </div>`;
  lunchReady = true;
}

function renderMore() {
  parkCkAuth();
  const c = t();
  const adminTools = canSeePassLog() ? `
      <div class="card wide">
        <b>${c.openPasses}</b>
        <p class="muted">${canSeePassLog() && currentRole() === "teacher" ? c.dashTeacher : c.dashAdmin}</p>
        <label class="muted">${c.token}</label>
        <input id="token" type="password" style="margin:8px 0;">
        <label class="muted">${c.env}</label>
        <select id="env" style="margin:8px 0;">
          <option value="development">Development</option>
          <option value="production">Production</option>
        </select>
        <button class="primary" type="button" id="saveToken">${c.saveToken}</button>
        <p class="ok hidden" id="tokenSaved"></p>
        ${canIssuePass() ? `<button class="ghost" type="button" data-go="issuepass" style="width:100%;margin-top:8px;">${c.issuePass}</button>` : ""}
        <button class="ghost" type="button" id="openPasses" style="width:100%;margin-top:8px;">${c.openPasses}</button>
        ${canSeeAuditLog() ? `<button class="ghost" type="button" data-go="audit" style="width:100%;margin-top:8px;">${c.auditOpen}</button>` : ""}
        ${canClearPassLog() ? `<div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--line,#ddd);">
          <b>${c.adminPassWipeTitle}</b>
          <p class="muted">${c.adminPassWipeBody}</p>
          <label class="muted">${c.adminPassWipeCode}</label>
          <input id="passWipeCode" type="text" autocomplete="off" spellcheck="false" style="margin:8px 0;">
          <button class="ghost" type="button" data-action="askClearPassLog" style="width:100%;color:#B42318;">${c.adminPassWipe}</button>
          <p class="error" id="passWipeError"></p>
          <p class="ok hidden" id="passWipeOk"></p>
        </div>` : ""}
        ${canSeePassLog() ? `<div id="ck-auth-more"></div>` : ""}
      </div>` : "";
  const face = window._profilePhoto
    ? `<span class="avatar"><img alt="" src="${escapeHtml(window._profilePhoto)}"></span>`
    : `<span class="avatar">${escapeHtml(initials(profile ? profile.displayName : ""))}</span>`;
  const localStaff = currentRole() === "teacher" || currentRole() === "administrator";
  const staffWait = localStaff && !verifiedStaffRole()
    ? `<div class="card wide"><b>${c.staffNotListed}</b><p class="muted" id="staffCloudId">${escapeHtml(window._ckUserRecordName || "")}</p><button class="ghost" type="button" data-action="copyStaffId" style="width:100%;">${c.staffCopyId}</button></div>`
    : "";
  document.getElementById("view-more").innerHTML = `
    <div class="dash">
      <div class="card wide"><div class="more-face">${face}<div><div class="t">${escapeHtml(profile ? profile.displayName : "")}</div><div class="s">${escapeHtml(roleLabel())}</div></div></div></div>
      ${staffWait}
      ${adminTools}
      ${guestWebCodeCard()}
      ${isGuest() ? `${guestHomeCard()}<button class="card action" type="button" data-action="useCode"><div class="t">${c.useCode}</div></button>` : ""}
      <button class="card action" type="button" id="signOutProfile">${c.signOut}</button>
    </div>`;
  const tokenEl = document.getElementById("token");
  const envEl = document.getElementById("env");
  if (tokenEl) tokenEl.value = schoolToken();
  if (envEl) envEl.value = schoolEnv();
  mountCkAuth(document.getElementById("ck-auth-more"));
  if (localStaff && !verifiedStaffRole() && ckWebAuthToken() && !window._ckUserRecordName) {
    ckUserRecordName().then((id) => {
      const node = document.getElementById("staffCloudId");
      if (node && id) node.textContent = id;
    }).catch(() => {});
  }
}

function personButton(person) {
  const mail = person.email ? `mailto:${person.email}` : "";
  return `<button class="staff" type="button" data-mail="${escapeHtml(mail)}">
    <span><div class="t">${escapeHtml(person.name)}</div>
    <div class="s">${escapeHtml(person.group || "")}${person.email ? " · " + escapeHtml(person.email) : ""}</div></span>
    <span class="s">${person.email ? t().email + " ›" : ""}</span>
  </button>`;
}

function renderStaff(query) {
  const q = String(query || "").trim().toLowerCase();
  const list = staff.filter((person) => {
    const blob = `${person.name} ${person.group} ${person.email}`.toLowerCase();
    return !q || blob.includes(q);
  });
  document.getElementById("view-contacts").innerHTML = `
    ${view === "contacts" ? backBar() : ""}
    <input class="search" id="staffQuery" placeholder="${t().search}" value="${escapeHtml(query || "")}">
    <div class="people-grid">${list.slice(0, 120).map((person) => `<div class="card">${personButton(person)}</div>`).join("") || `<div class="card"><p class="muted">${t().search}</p></div>`}</div>`;
}

function swipeSubtitle(hasPhoto) {
  const c = t();
  if (!hasPhoto) return c.swipeSub;
  const name = (profile && (profile.firstName || profile.displayName)) || "";
  const grade = profile && profile.grade ? `${c.grade} ${profile.grade}` : "";
  return [name, grade].filter(Boolean).join(" · ") || c.swipe;
}

function applyAvatar(url) {
  window._profilePhoto = url || "";
  const node = document.getElementById("avatar");
  if (!node) return;
  if (url) {
    node.innerHTML = `<img alt="" src="${escapeHtml(url)}">`;
  } else {
    node.textContent = initials(profile ? profile.displayName : "");
  }
}

async function loadProfilePhoto() {
  if (!profile || !profile.key) {
    applyAvatar("");
    return;
  }
  if (!schoolToken()) return;
  try { await ensureCloud(); } catch (_) {}
  try {
    const profiles = await fetchByNames(cloudDb(), [profile.key]);
    const mine = profiles.find((item) => normalizeCode(item.recordName) === normalizeCode(profile.key) || String(item.recordName || "") === profile.key);
    const secrets = await profileSecrets(mine, profile.key);
    applyAvatar(secrets.photo);
    if (view === "more") renderMore();
  } catch (_) {}
}

function applySwipeTile(url) {
  const tileSub = document.getElementById("swipeTileSub");
  const mark = document.getElementById("swipeTileMark");
  if (tileSub) tileSub.textContent = swipeSubtitle(!!url);
  if (mark) {
    mark.src = url || "./SwipeCard.png";
    mark.className = url ? "tile-id" : "tile-swipe";
  }
}

function swipeUploadControls(hasPhoto) {
  const c = t();
  return `<input id="swipeFile" class="hidden" type="file" accept="image/*" capture="environment">
    <button class="primary" type="button" data-action="pickSwipe" style="max-width:480px;">${hasPhoto ? c.replaceSwipePhoto : c.addSwipePhoto}</button>`;
}
function swipePage(url) {
  const c = t();
  const name = (profile && (profile.firstName || profile.displayName)) || "Warrior";
  const grade = profile && profile.grade ? `${c.grade} ${profile.grade}` : "";
  const canUpload = isGuestStudent();
  if (!url) {
    return `${backBar()}<div class="card wide" style="max-width:480px;">
      <p class="muted" style="margin:0;">${canUpload ? c.swipeGuestEmpty : c.noSwipe}</p>
      ${canUpload ? swipeUploadControls(false) : ""}
    </div>`;
  }
  return `${backBar()}
    <div class="card wide" style="max-width:480px;">
      <img class="id-photo" alt="" src="${escapeHtml(url)}">
      <div class="id-meta">
        <div class="t">${escapeHtml(name)}</div>
        <div class="s">${escapeHtml(c.school)}${grade ? " · " + escapeHtml(grade) : ""}</div>
      </div>
      ${canUpload ? swipeUploadControls(true) : ""}
    </div>`;
}
function saveGuestSwipe(dataUrl) {
  if (!profile || !isGuestStudent() || !dataUrl) return;
  profile.swipeCard = dataUrl;
  localStorage.setItem("whsWebProfile", JSON.stringify(profile));
}
function compressSwipePhoto(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("no file"));
      return;
    }
    const img = new Image();
    const blobURL = URL.createObjectURL(file);
    img.onload = () => {
      const max = 1400;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(blobURL);
      resolve(canvas.toDataURL("image/jpeg", 0.72));
    };
    img.onerror = () => {
      URL.revokeObjectURL(blobURL);
      reject(new Error("image"));
    };
    img.src = blobURL;
  });
}
async function handleSwipeFile(file) {
  try {
    const dataUrl = await compressSwipePhoto(file);
    saveGuestSwipe(dataUrl);
    applySwipeTile(dataUrl);
    if (view === "swipe") loadSwipeCard();
    if (view === "home") applySwipeTile(dataUrl);
  } catch (_) {}
}

const SPANISH_FILES = [
  { id: "spanishSerEstar", file: "./study/SerVsEstar.png", kind: "image" },
  { id: "spanishBootVerbs", file: "./study/Spanish-Boot-Verbs.pdf", kind: "pdf" },
  { id: "spanishVocabPacket", file: "./study/Spanish-Vocab-Packet-1.pdf", kind: "pdf" },
  { id: "spanishPreteriteSheet", file: "./study/Spanish-Preterite-Study-Sheet.pdf", kind: "pdf" },
  { id: "spanishPreteriteImperfect", file: "./study/Spanish-Preterite-Imperfect-Uses.pdf", kind: "pdf" }
];
const SPANISH_READY_SETS = [
  { id: "present", nameKey: "presentTense", kind: "form", pairs: [
    ["hablar · yo", "hablo"], ["hablar · tú", "hablas"], ["hablar · ella", "habla"], ["hablar · nosotros", "hablamos"],
    ["comer · yo", "como"], ["comer · tú", "comes"], ["comer · ellos", "comen"],
    ["vivir · yo", "vivo"], ["vivir · tú", "vives"], ["vivir · nosotros", "vivimos"],
    ["tener · yo", "tengo"], ["ir · yo", "voy"], ["ser · yo", "soy"], ["estar · yo", "estoy"],
    ["hacer · yo", "hago"], ["decir · yo", "digo"]
  ]},
  { id: "boot", nameKey: "bootVerbsGame", kind: "form", pairs: [
    ["pensar · yo", "pienso"], ["pensar · tú", "piensas"], ["pensar · nosotros", "pensamos"],
    ["querer · yo", "quiero"], ["querer · tú", "quieres"], ["querer · nosotros", "queremos"],
    ["poder · yo", "puedo"], ["poder · ella", "puede"], ["poder · nosotros", "podemos"],
    ["dormir · yo", "duermo"], ["dormir · nosotros", "dormimos"],
    ["pedir · yo", "pido"], ["pedir · tú", "pides"],
    ["jugar · yo", "juego"], ["jugar · nosotros", "jugamos"], ["empezar · yo", "empiezo"]
  ]},
  { id: "serestar", nameKey: "serEstarGame", kind: "form", pairs: [
    ["Yo ___ de México.", "soy"], ["Ella ___ doctora.", "es"], ["Nosotros ___ estudiantes.", "somos"],
    ["Tú ___ inteligente.", "eres"], ["Ellos ___ altos.", "son"], ["El libro ___ de Ana.", "es"],
    ["Yo ___ cansado.", "estoy"], ["Ella ___ en casa.", "está"], ["Nosotros ___ enfermos.", "estamos"],
    ["Tú ___ feliz hoy.", "estás"], ["La fiesta ___ en el parque.", "está"], ["¿Dónde ___ el baño?", "está"],
    ["Las ventanas ___ abiertas.", "están"], ["Ustedes ___ listos.", "están"]
  ]},
  { id: "preterite", nameKey: "preteriteGame", kind: "form", pairs: [
    ["hablar · yo · pretérito", "hablé"], ["hablar · tú · pretérito", "hablaste"], ["hablar · él · pretérito", "habló"],
    ["comer · yo · pretérito", "comí"], ["comer · ella · pretérito", "comió"],
    ["vivir · yo · pretérito", "viví"], ["vivir · ellos · pretérito", "vivieron"],
    ["ir · yo · pretérito", "fui"], ["ser · ella · pretérito", "fue"],
    ["tener · yo · pretérito", "tuve"], ["estar · nosotros · pretérito", "estuvimos"], ["hacer · yo · pretérito", "hice"]
  ]},
  { id: "aspect", nameKey: "aspectGame", kind: "aspect", pairs: [
    ["Ayer yo _____ al cine con mis amigos.", "fui", "iba"],
    ["Cuando era niño, yo _____ al parque todos los días.", "iba", "fui"],
    ["Anoche nosotros _____ una película.", "vimos", "veíamos"],
    ["Los viernes nosotros siempre _____ películas.", "veíamos", "vimos"],
    ["De repente, ella _____ la puerta.", "abrió", "abría"],
    ["Mientras yo _____, mi hermano leía.", "estudiaba", "estudié"],
    ["El año pasado ellos _____ a México.", "fueron", "iban"],
    ["Cada verano ellos _____ a la playa.", "iban", "fueron"],
    ["Una vez yo _____ un perro negro.", "tuve", "tenía"],
    ["De niña, ella _____ un perro.", "tenía", "tuvo"],
    ["Anoche tú _____ la tarea.", "hiciste", "hacías"],
    ["Todos los días tú _____ la tarea después de clase.", "hacías", "hiciste"],
    ["Ayer yo _____ con María por una hora.", "hablé", "hablaba"],
    ["Mientras hablábamos, el teléfono _____.", "sonó", "sonaba"],
    ["Cuando yo era joven, _____ en León.", "vivía", "viví"],
    ["El lunes pasado nosotros _____ el examen.", "dimos", "dábamos"],
    ["Siempre nosotros _____ exámenes los lunes.", "dábamos", "dimos"],
    ["Ayer, de repente, _____ a llover.", "empezó", "empezaba"]
  ]},
  { id: "articles", nameKey: "articlesSet", kind: "form", pairs: [
    ["libro", "el"], ["casa", "la"], ["lápiz", "el"], ["mesa", "la"], ["chico", "el"], ["chica", "la"],
    ["libros", "los"], ["casas", "las"], ["problema", "el"], ["mano", "la"], ["día", "el"], ["agua", "el"]
  ]},
  { id: "numbers", nameKey: "numbersSet", kind: "form", pairs: [
    ["11", "once"], ["12", "doce"], ["13", "trece"], ["15", "quince"], ["16", "dieciséis"],
    ["20", "veinte"], ["21", "veintiuno"], ["22", "veintidós"], ["30", "treinta"], ["40", "cuarenta"],
    ["100", "cien"], ["500", "quinientos"]
  ]}
];
const FILE_TITLES = {
  en: {
    spanishSerEstar: "Ser vs Estar",
    spanishBootVerbs: "Boot verbs",
    spanishVocabPacket: "Español 1 Vocab Packet",
    spanishPreteriteSheet: "Preterite study sheet",
    spanishPreteriteImperfect: "Preterite and imperfect"
  },
  es: {
    spanishSerEstar: "Ser vs Estar",
    spanishBootVerbs: "Verbos de bota",
    spanishVocabPacket: "Paquete de vocabulario de Español 1",
    spanishPreteriteSheet: "Hoja de pretérito",
    spanishPreteriteImperfect: "Pretérito e imperfecto"
  }
};

const CLASS_CATEGORIES = ["Math", "English", "Science", "Spanish", "History", "CTE", "Publishing"];
const COURSE_LEVELS = ["College Prep", "Honors", "AP", "ECE", "Dual Enrollment", "Elective"];
const CATEGORY_KEYS = {
  Math: "catMath", English: "catEnglish", Science: "catScience", Spanish: "catSpanish",
  History: "catHistory", CTE: "catCTE", Publishing: "catPublishing"
};
const LEVEL_KEYS = {
  "College Prep": "levelCP", Honors: "levelHonors", AP: "levelAP", ECE: "levelECE",
  "Dual Enrollment": "levelDual", Elective: "levelElective"
};

function parseStudy(raw) {
  if (!raw) return { classes: [], spanish: {}, english: {} };
  try {
    const parsed = JSON.parse(raw);
    return {
      classes: Array.isArray(parsed.classes) ? parsed.classes : [],
      spanish: parsed.spanish && typeof parsed.spanish === "object" ? parsed.spanish : {},
      english: parsed.english && typeof parsed.english === "object" ? parsed.english : {}
    };
  } catch (_) {
    return { classes: [], spanish: {}, english: {} };
  }
}

function studyState() {
  return window._study || { classes: [], spanish: {}, english: {} };
}

function canEditClassesOnSite() {
  return isGuestStudent();
}

function guestClassList() {
  return Array.isArray(profile && profile.classes) ? profile.classes.slice() : [];
}

function persistGuestClasses(classes) {
  if (!profile) return;
  profile.classes = classes;
  localStorage.setItem("whsWebProfile", JSON.stringify(profile));
  window._study = { classes, spanish: {}, english: {} };
}

function applyGuestStudy() {
  window._study = { classes: guestClassList(), spanish: {}, english: {} };
}

function newClassId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
  return "class-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function categoryLabel(value) {
  return t()[CATEGORY_KEYS[value] || ""] || value;
}

function levelLabel(value) {
  return t()[LEVEL_KEYS[value] || ""] || value;
}

function classOptionList(values, selected, labels) {
  return values.map((value) => {
    const picked = value === selected ? " selected" : "";
    return `<option value="${escapeHtml(value)}"${picked}>${escapeHtml(labels(value))}</option>`;
  }).join("");
}

function showClassEditor(existing) {
  const c = t();
  const course = existing || {};
  openSheet(`
    <div class="card-title"><b>${existing ? c.editClass : c.addClass}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <input type="hidden" id="classEditId" value="${escapeHtml(course.id || "")}">
    <label class="sheet-field"><span>${c.classSubject}</span><input id="classSubject" value="${escapeHtml(course.subject || "")}" autocomplete="off"></label>
    <label class="sheet-field"><span>${c.classTeacher}</span><input id="classTeacher" value="${escapeHtml(course.teacher || "")}" autocomplete="off"></label>
    <label class="sheet-field"><span>${c.classLevel}</span><select id="classLevel">${classOptionList(COURSE_LEVELS, course.courseLevel || "College Prep", levelLabel)}</select></label>
    <label class="sheet-field"><span>${c.classCategory}</span><select id="classCategory">${classOptionList(CLASS_CATEGORIES, course.category || "Spanish", categoryLabel)}</select></label>
    <label class="sheet-field"><span>${c.classRoom}</span><input id="classRoom" value="${escapeHtml(course.room || "")}" autocomplete="off"></label>
    <label class="sheet-field"><span>${c.classClassroom}</span><input id="classClassroom" value="${escapeHtml(course.classroomURL || "")}" placeholder="https://classroom.google.com/..." autocomplete="off"></label>
    <p class="error" id="classEditError"></p>
    <button class="primary" type="button" data-action="saveClass">${c.saveClass}</button>`);
}

function saveClassFromSheet() {
  const err = document.getElementById("classEditError");
  const subject = (document.getElementById("classSubject") || {}).value || "";
  const teacher = (document.getElementById("classTeacher") || {}).value || "";
  const trimmedSubject = subject.trim();
  const trimmedTeacher = teacher.trim();
  if (!trimmedSubject || !trimmedTeacher) {
    if (err) err.textContent = t().classNeedInfo;
    return;
  }
  const id = ((document.getElementById("classEditId") || {}).value || "").trim() || newClassId();
  const classes = guestClassList();
  const next = {
    id,
    subject: trimmedSubject,
    teacher: trimmedTeacher,
    courseLevel: (document.getElementById("classLevel") || {}).value || "College Prep",
    category: (document.getElementById("classCategory") || {}).value || "Spanish",
    classroomURL: ((document.getElementById("classClassroom") || {}).value || "").trim(),
    letterGrade: "",
    room: ((document.getElementById("classRoom") || {}).value || "").trim()
  };
  const index = classes.findIndex((item) => item.id === id);
  if (index >= 0) {
    next.letterGrade = classes[index].letterGrade || "";
    classes[index] = next;
  } else {
    classes.push(next);
  }
  persistGuestClasses(classes);
  closeSheet();
  applyClassTile();
  if (view === "classes") renderClasses();
  if (view === "class") renderClassDetail();
}

function confirmDeleteClass(id) {
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.deleteClassTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.deleteClassBody}</p>
    <button class="primary" type="button" data-action="closeSheet">${c.signOutCancel}</button>
    <button class="ghost" type="button" data-action="deleteClass" data-class-id="${escapeHtml(id || "")}" style="width:100%;margin-top:8px;color:#B42318;">${c.deleteClass}</button>`);
}

function deleteGuestClass(id) {
  persistGuestClasses(guestClassList().filter((item) => item.id !== id));
  closeSheet();
  if (window._classID === id) window._classID = "";
  applyClassTile();
  if (view === "class") show("classes");
  else if (view === "classes") renderClasses();
}

function classById(id) {
  return studyState().classes.find((item) => item.id === id);
}

function notebooksFor(course) {
  if (!course) return [];
  const key = course.id;
  const cat = String(course.category || "").toLowerCase();
  const pack = cat === "spanish" ? studyState().spanish[key] : cat === "english" ? studyState().english[key] : null;
  return (pack && pack.folders) || [];
}

function resourcesFor(course) {
  const c = t();
  const cat = String(course.category || "").toLowerCase();
  if (cat === "spanish") {
    return [
      { id: "spanishStudyGames", title: c.readySets, kind: "readySets" },
      { id: "spanishStudyFolder", title: c.studyFolder, kind: "folder" }
    ];
  }
  if (cat === "english") {
    return [
      { id: "englishDefinitionQuiz", title: c.englishQuiz, kind: "englishQuiz" },
      { id: "englishStudyGames", title: c.studyGames, kind: "englishVocab" }
    ];
  }
  return [];
}

function applyClassTile() {
  const tileSub = document.getElementById("classTileSub");
  if (!tileSub) return;
  const courses = studyState().classes;
  if (!courses.length) {
    tileSub.textContent = t().classesSub;
    return;
  }
  tileSub.textContent = courses.length === 1
    ? (courses[0].subject || t().classesTile)
    : `${courses.length} ${t().classesTile}`;
}

function renderClasses() {
  const node = document.getElementById("view-classes");
  if (!(node && view === "classes")) return;
  const c = t();
  const courses = studyState().classes;
  const add = canEditClassesOnSite()
    ? `<button class="card action wide" type="button" data-action="addClass"><div class="t">${c.addClass}</div></button>`
    : "";
  if (!courses.length) {
    node.innerHTML = `${backBar()}<div class="dash">${add}<div class="card wide"><p class="muted" style="margin:0;">${canEditClassesOnSite() ? c.noClassesGuest : c.noClasses}</p></div></div>`;
    return;
  }
  node.innerHTML = backBar() + `<div class="dash">` + add + courses.map((course) => `
    <button class="card action" type="button" data-action="openClass" data-class-id="${escapeHtml(course.id)}">
      <div class="t">${escapeHtml(course.subject || t().classesTile)}</div>
      <div class="s">${escapeHtml([course.teacher, levelLabel(course.courseLevel), course.room].filter(Boolean).join(" · "))}</div>
    </button>`).join("") + `</div>`;
}

function renderClassDetail() {
  const node = document.getElementById("view-class");
  if (!(node && view === "class")) return;
  const course = classById(window._classID);
  const c = t();
  if (!course) {
    node.innerHTML = `${backBar()}<div class="card wide"><p class="muted" style="margin:0;">${c.noClasses}</p></div>`;
    return;
  }
  const resources = resourcesFor(course);
  const classroom = String(course.classroomURL || "").trim();
  const classroomHref = classroom && !/^https?:/i.test(classroom) ? `https://${classroom}` : classroom;
  const edit = canEditClassesOnSite() ? `
      <button class="ghost" type="button" data-action="editClass" data-class-id="${escapeHtml(course.id)}" style="margin-top:10px;">${c.editClass}</button>
      <button class="ghost" type="button" data-action="askDeleteClass" data-class-id="${escapeHtml(course.id)}" style="width:100%;margin-top:8px;color:#B42318;">${c.deleteClass}</button>` : "";
  node.innerHTML = `
    <div class="toolbar"><button class="ghost" type="button" data-go="classes">${c.back}</button></div>
    <div class="card wide">
      <div class="t">${escapeHtml(course.subject || "")}</div>
      <div class="s">${escapeHtml([course.teacher, levelLabel(course.courseLevel), categoryLabel(course.category), course.letterGrade].filter(Boolean).join(" · "))}</div>
      ${classroomHref ? `<p><a href="${escapeHtml(classroomHref)}" target="_blank" rel="noopener" style="color:var(--orange);font-weight:600;">${c.classroom}</a></p>` : ""}
      ${edit}
    </div>
    <p class="section">${c.resources}</p>
    <div class="dash">${resources.length ? resources.map((resource) => `
      <button class="card action" type="button" data-action="openResource" data-resource="${escapeHtml(resource.id)}" data-class-id="${escapeHtml(course.id)}">
        <div class="t">${escapeHtml(resource.title)}</div>
        <div class="s">${resource.kind === "phone" ? c.openOnPhone : resource.kind === "readySets" ? c.readyHint : c.classesBody}</div>
      </button>`).join("") : `<div class="card wide"><p class="muted" style="margin:0;">${c.noResources}</p></div>`}</div>`;
}

function listCards(folders, kind) {
  const c = t();
  const rows = [];
  (folders || []).forEach((folder) => {
    (folder.lists || []).forEach((list) => {
      const count = (list.entries || []).length;
      rows.push(`<button class="card action" type="button" data-action="openList" data-kind="${kind}" data-folder="${escapeHtml(folder.id)}" data-list="${escapeHtml(list.id)}">
        <div class="t">${escapeHtml(list.name || folder.name || c.flashcards)}</div>
        <div class="s">${escapeHtml(folder.name || "")} · ${count}</div>
      </button>`);
    });
  });
  return rows.join("") || `<div class="card wide"><p class="muted" style="margin:0;">${c.noWords}</p></div>`;
}

function pairsFromList(kind, folderID, listID) {
  const course = classById(window._classID);
  const folders = notebooksFor(course);
  const list = (folders.find((folder) => folder.id === folderID) || { lists: [] }).lists.find((item) => item.id === listID);
  const entries = (list && list.entries) || [];
  if (kind === "english" || kind === "englishQuiz") {
    return entries.filter((entry) => entry.word).map((entry) => ({ front: entry.word, back: entry.definition || "" }));
  }
  return entries.filter((entry) => entry.spanish).map((entry) => ({ front: entry.spanish, back: entry.english || "" }));
}

function renderStudy() {
  const node = document.getElementById("view-study");
  if (!(node && view === "study")) return;
  const c = t();
  const back = `<div class="toolbar"><button class="ghost" type="button" data-action="openClass" data-class-id="${escapeHtml(window._classID || "")}">${c.back}</button></div>`;
  const mode = window._studyMode || {};
  document.body.classList.toggle("ql-open", mode.type === "learn");
  if (mode.type === "phone") {
    node.innerHTML = `${back}<div class="card wide"><p class="muted" style="margin:0;">${c.openOnPhone}</p></div>`;
    return;
  }
  if (mode.type === "folder") {
    const titles = FILE_TITLES[lang] || FILE_TITLES.en;
    node.innerHTML = back + `<div class="dash">` + SPANISH_FILES.map((file) => `
      <button class="card action" type="button" data-action="openFile" data-file="${escapeHtml(file.file)}" data-kind="${file.kind}" data-title="${escapeHtml(titles[file.id] || file.id)}">
        <div class="t">${escapeHtml(titles[file.id] || file.id)}</div>
      </button>`).join("") + `</div>`;
    return;
  }
  if (mode.type === "file") {
    const body = mode.kind === "image"
      ? `<img class="id-photo" alt="" src="${escapeHtml(mode.file)}">`
      : `<iframe class="study-doc" title="${escapeHtml(mode.title || "")}" src="${escapeHtml(mode.file)}"></iframe>`;
    node.innerHTML = `${back}<div class="card wide"><div class="t">${escapeHtml(mode.title || "")}</div>${body}</div>`;
    return;
  }
  if (mode.type === "readySets") {
    node.innerHTML = `${back}<p class="muted">${c.readyHint}</p><div class="dash">` + SPANISH_READY_SETS.map((set) => `
      <button class="card action" type="button" data-action="openReadySet" data-set="${escapeHtml(set.id)}">
        <div class="t">${escapeHtml(c[set.nameKey] || set.id)}</div>
        <div class="s">${set.pairs.length}</div>
      </button>`).join("") + `</div>`;
    return;
  }
  if (mode.type === "learn") {
    node.innerHTML = renderLearnQuiz();
    return;
  }
  if (mode.type === "lists") {
    const course = classById(window._classID);
    node.innerHTML = back + `<div class="dash">` + listCards(notebooksFor(course), mode.kind) + `</div>`;
    return;
  }
  if (mode.type === "cards" || mode.type === "quiz") {
    const pairs = window._studyPairs || [];
    if (!pairs.length) {
      node.innerHTML = `${back}<div class="card wide"><p class="muted" style="margin:0;">${c.noWords}</p></div>`;
      return;
    }
    if (mode.type === "quiz") {
      renderQuiz(node, back, pairs);
      return;
    }
    const index = Math.max(0, Math.min(window._cardIndex || 0, pairs.length - 1));
    window._cardIndex = index;
    const pair = pairs[index];
    const shown = window._cardFlip ? pair.back || " " : pair.front;
    node.innerHTML = `${back}
      <div class="s" style="margin-bottom:8px;">${index + 1} / ${pairs.length}</div>
      <button class="flash action" type="button" data-action="flipCard"><b>${escapeHtml(shown)}</b><div class="s">${window._cardFlip ? "" : c.tapReveal}</div></button>
      <div class="toolbar">
        <button class="ghost" type="button" data-action="prevCard">${c.previous}</button>
        <button class="ghost" type="button" data-action="nextCard">${c.next}</button>
        <button class="ghost" type="button" data-action="startQuiz">${c.quiz}</button>
      </div>`;
    return;
  }
  node.innerHTML = `${back}<div class="card wide"><p class="muted" style="margin:0;">${c.noResources}</p></div>`;
}

function renderQuiz(node, back, pairs) {
  const c = t();
  const defined = pairs.filter((pair) => pair.back);
  if (defined.length < 2) {
    node.innerHTML = `${back}<div class="card wide"><p class="muted" style="margin:0;">${c.noWords}</p></div>`;
    return;
  }
  const quiz = window._quiz || startQuiz(defined);
  if (quiz.index >= quiz.order.length) {
    node.innerHTML = `${back}<div class="card wide"><div class="t">${c.quizDone}</div><div class="s">${c.correct}: ${quiz.correct} / ${quiz.order.length}</div></div>`;
    return;
  }
  const current = quiz.order[quiz.index];
  const choices = quiz.choices[quiz.index] || [];
  node.innerHTML = `${back}
    <div class="s">${quiz.index + 1} / ${quiz.order.length}</div>
    <div class="card wide"><div class="t">${escapeHtml(current.front)}</div></div>
    ${choices.map((choice, i) => `<button class="quiz-choice" type="button" data-action="quizPick" data-pick="${i}">${escapeHtml(choice)}</button>`).join("")}
    <p class="muted" id="quizNote"></p>`;
}

function startLearnQuiz(setId) {
  const set = SPANISH_READY_SETS.find((item) => item.id === setId);
  if (!set) return;
  const deck = set.pairs.map((pair) => ({
    prompt: pair[0],
    answer: pair[1],
    alt: pair[2] || ""
  })).sort(() => Math.random() - 0.5);
  window._ql = {
    setId,
    kind: set.kind,
    deck,
    index: 0,
    correct: 0,
    selected: "",
    revealed: false,
    finished: !deck.length,
    options: []
  };
  loadLearnOptions();
  window._studyMode = { type: "learn" };
  show("study");
  renderStudy();
}

function loadLearnOptions() {
  const ql = window._ql;
  if (!ql || !ql.deck[ql.index]) {
    if (ql) ql.options = [];
    return;
  }
  const item = ql.deck[ql.index];
  if (ql.kind === "aspect" && item.alt) {
    ql.options = [item.answer, item.alt].sort(() => Math.random() - 0.5);
    return;
  }
  const pool = ql.deck.map((pair) => pair.answer).filter((answer) => answer !== item.answer);
  const options = [item.answer];
  while (options.length < Math.min(4, pool.length + 1) && pool.length) {
    const next = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    if (next && !options.includes(next)) options.push(next);
  }
  ql.options = options.sort(() => Math.random() - 0.5);
}

function renderLearnQuiz() {
  const c = t();
  const ql = window._ql;
  if (!ql) return `<div class="card wide"><p class="muted">${c.noResources}</p></div>`;
  const total = ql.deck.length;
  const progress = ql.finished ? 100 : ((ql.index + (ql.revealed ? 1 : 0)) / Math.max(total, 1)) * 100;
  if (ql.finished) {
    return `<div class="ql">
      <div class="ql-head"><button class="ql-x" type="button" data-action="qlClose">${"×"}</button><span></span></div>
      <div class="ql-track"><div class="ql-fill" style="width:100%"></div></div>
      <div class="ql-summary">
        <div class="t">${c.aspectDone}</div>
        <p class="muted">${c.correct}: ${ql.correct} / ${total}</p>
        <button class="ql-go" type="button" data-action="qlAgain">${c.practiceAgain}</button>
      </div>
    </div>`;
  }
  const item = ql.deck[ql.index];
  const ok = ql.revealed && ql.selected === item.answer;
  return `<div class="ql">
    <div class="ql-head">
      <button class="ql-x" type="button" data-action="qlClose">${"×"}</button>
      <div class="ql-count">${Math.min(ql.index + 1, total)} / ${total}</div>
      <span style="width:36px"></span>
    </div>
    <div class="ql-track"><div class="ql-fill" style="width:${progress}%"></div></div>
    <div class="ql-body">
      ${ql.revealed ? `<div class="ql-pop ${ok ? "ok" : "bad"}">${ok ? c.learnCorrect : c.learnIncorrect}</div>` : ""}
      <div class="ql-prompt">${escapeHtml(item.prompt)}</div>
      <div class="ql-choose">${c.chooseAnswer}</div>
      ${ql.options.map((choice) => {
        let cls = "ql-opt";
        if (ql.revealed && choice === item.answer) cls += " ok";
        else if (ql.revealed && choice === ql.selected) cls += " bad";
        else if (ql.revealed) cls += " dim";
        return `<button class="${cls}" type="button" data-action="qlPick" data-pick="${escapeHtml(choice)}">${escapeHtml(choice)}</button>`;
      }).join("")}
      ${ql.revealed ? `<button class="ql-go" type="button" data-action="qlContinue">${ql.index + 1 >= total ? c.close : c.continueBtn}</button>` : ""}
    </div>
  </div>`;
}

function startQuiz(pairs) {
  const shuffled = pairs.slice().sort(() => Math.random() - 0.5).slice(0, 20);
  const quiz = { order: shuffled, index: 0, correct: 0, choices: shuffled.map((item) => {
    const others = pairs.filter((pair) => pair.back !== item.back).map((pair) => pair.back);
    const options = [item.back];
    while (options.length < 4 && others.length) {
      const next = others.splice(Math.floor(Math.random() * others.length), 1)[0];
      if (next && !options.includes(next)) options.push(next);
    }
    return options.sort(() => Math.random() - 0.5);
  }) };
  window._quiz = quiz;
  return quiz;
}

function openResource(classID, resourceID) {
  window._classID = classID;
  const course = classById(classID);
  const resource = resourcesFor(course || { category: "" }).find((item) => item.id === resourceID);
  if (!resource || resource.kind === "phone") {
    window._studyMode = { type: "phone" };
  } else if (resource.kind === "folder") {
    window._studyMode = { type: "folder" };
  } else if (resource.kind === "readySets") {
    window._studyMode = { type: "readySets" };
  } else if (resource.kind === "englishQuiz") {
    window._studyMode = { type: "lists", kind: "englishQuiz" };
  } else if (resource.kind === "englishVocab") {
    window._studyMode = { type: "lists", kind: "english" };
  } else {
    window._studyMode = { type: "lists", kind: "spanish" };
  }
  show("study");
  renderStudy();
}

async function loadStudy() {
  applyClassTile();
  if (isGuestStudent()) {
    applyGuestStudy();
    applyClassTile();
    if (view === "classes") renderClasses();
    if (view === "class") renderClassDetail();
    if (view === "study") renderStudy();
    return;
  }
  if (currentRole() !== "student" || !profile || !profile.key) {
    if (view === "classes") renderClasses();
    if (view === "class") renderClassDetail();
    return;
  }
  try { await ensureCloud(); } catch (_) {}
  try {
    const profiles = await fetchByNames(cloudDb(), [profile.key]);
    const mine = profiles.find((item) => normalizeCode(item.recordName) === normalizeCode(profile.key) || String(item.recordName || "") === profile.key);
    const secrets = await profileSecrets(mine, profile.key);
    window._study = parseStudy(secrets.study);
    applyClassTile();
    if (view === "classes") renderClasses();
    if (view === "class") renderClassDetail();
    if (view === "study") renderStudy();
  } catch (error) {
    const node = document.getElementById("view-classes");
    if (node && view === "classes") node.innerHTML = `${backBar()}<p class="error">${escapeHtml(error.message)}</p>`;
  }
}

async function loadSwipeCard() {
  const list = document.getElementById("view-swipe");
  if (isGuestStudent()) {
    const url = (profile && profile.swipeCard) || "";
    applySwipeTile(url);
    if (list && view === "swipe") list.innerHTML = swipePage(url);
    return;
  }
  if (!isPairedStudent()) return;
  if (list && view === "swipe") list.innerHTML = `${backBar()}<p class="muted">${t().swipe}</p>`;
  applySwipeTile("");
  if (!schoolToken()) {
    if (list && view === "swipe") list.innerHTML = swipePage("");
    return;
  }
  try { await ensureCloud(); } catch (_) {}
  try {
    const profiles = await fetchByNames(cloudDb(), [profile.key]);
    const mine = profiles.find((item) => normalizeCode(item.recordName) === normalizeCode(profile.key) || String(item.recordName || "") === profile.key);
    const secrets = await profileSecrets(mine, profile.key);
    const url = secrets.swipe;
    applySwipeTile(url);
    if (list && view === "swipe") list.innerHTML = swipePage(url);
  } catch (error) {
    if (list && view === "swipe") {
      list.innerHTML = `${backBar()}<p class="error">${escapeHtml(error.message)}</p>`;
    }
  }
}

function openPassesInfo() {
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.passesTile}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.passesHint}</p>
    <button class="primary" type="button" data-go="contacts">${c.openContacts}</button>`);
}

function openAsk(preset) {
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.askTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <input id="askBox" placeholder="${c.askPlaceholder}" value="${escapeHtml(preset || "")}">
    <button class="primary" type="button" data-action="askGo">${c.askGo}</button>
    <div id="askOut" class="muted" style="margin-top:12px;">${c.askEmpty}</div>`);
  if (preset) answerAsk(preset);
}

function answerAsk(raw) {
  const q = String(raw || "").trim().toLowerCase();
  const out = document.getElementById("askOut");
  if (!out) return;
  const c = t();
  if (!q) { out.textContent = c.askEmpty; return; }
  if (/lunch|almuerzo|menu|menú/.test(q)) {
    out.innerHTML = `<button class="primary" type="button" data-go="lunch">${c.openLunch}</button>`;
    return;
  }
  if (/news|noticia|agenda|calendar|calendario/.test(q)) {
    out.innerHTML = `<button class="primary" type="button" data-go="news">${c.openNews}</button>`;
    return;
  }
  if (/pass|pase|hallway|flex/.test(q)) {
    out.textContent = c.passesHint;
    return;
  }
  if (/attendance|asistencia/.test(q)) {
    out.innerHTML = `<a class="primary" style="display:block;text-align:center;text-decoration:none;" href="mailto:whsattendance@watertownps.org">${c.attendance}</a>`;
    return;
  }
  const hits = staff.filter((person) => `${person.name} ${person.group} ${person.email}`.toLowerCase().includes(q)).slice(0, 6);
  if (hits.length) {
    out.innerHTML = hits.map(personButton).join("");
    return;
  }
  out.textContent = c.askEmpty;
}

function openAide() {
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.aideTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.aideBody}</p>
    <button class="primary" type="button" data-go="contacts">${c.openContacts}</button>
    <button class="ghost" type="button" data-go="lunch" style="width:100%;margin-top:8px;">${c.openLunch}</button>
    <button class="ghost" type="button" data-go="news" style="width:100%;margin-top:8px;">${c.openNews}</button>
    <a class="ghost" style="display:block;text-align:center;margin-top:8px;text-decoration:none;" href="mailto:whsattendance@watertownps.org">${c.attendance}</a>`);
}

function renderIssuePass() {
  if (!canIssuePass()) return;
  const c = t();
  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const teacher = (profile && (profile.displayName || profile.firstName)) || "";
  document.getElementById("view-issuepass").innerHTML = `<div class="dash">
    <div class="toolbar"><button class="ghost" type="button" data-go="passes">${c.openPasses}</button></div>
    <div class="card wide">
      <div class="t">${c.issuePass}</div>
      <p class="muted">${c.issuePassBody}</p>
      <div class="sheet-field"><span>${c.issuePassType}</span>
        <div class="pass-type">
          <button type="button" data-action="passKind" data-kind="hallway">${c.hallway}</button>
          <button type="button" class="on" data-action="passKind" data-kind="flex">${c.flex}</button>
        </div>
      </div>
      <label class="sheet-field"><span>${c.issuePassStudent}</span>
        <input id="issueStudent" type="text" maxlength="80" autocomplete="off">
      </label>
      <label class="sheet-field"><span>${c.issuePassDestination}</span>
        <input id="issueDestination" type="text" maxlength="120" autocomplete="off">
      </label>
      <label class="sheet-field"><span>${c.issuePassDates}</span>
        <input id="issueDates" type="text" maxlength="80" value="${escapeHtml(today)}" autocomplete="off">
      </label>
      <div class="sheet-field"><span>${c.issuePassSignature}</span>
        <canvas class="sig-pad" id="passSigPad"></canvas>
        <button class="ghost" type="button" data-action="clearPassSig" style="width:100%;margin-top:8px;">${c.issuePassClearSig}</button>
      </div>
      <label class="sheet-field"><span>${c.issuePassCode}</span>
        <input id="issueWebCode" type="text" maxlength="12" autocomplete="off" spellcheck="false" placeholder="XXXXX-XXXXX">
      </label>
      <p class="muted">${escapeHtml(teacher)}</p>
      <p class="error" id="issuePassError"></p>
      <p class="ok hidden" id="issuePassOk"></p>
      <button class="primary" type="button" data-action="issuePass" id="issuePassBtn">${c.issuePass}</button>
    </div>
  </div>`;
  window._issuePassKind = "flex";
  bindPassSignaturePad();
}
function bindPassSignaturePad() {
  const canvas = document.getElementById("passSigPad");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const ratio = Math.max(1, window.devicePixelRatio || 1);
  const width = Math.max(280, canvas.clientWidth || 520);
  const height = 140;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  let drawing = false;
  const point = (event) => {
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches && event.touches[0];
    const src = touch || event;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };
  const start = (event) => {
    event.preventDefault();
    drawing = true;
    window._passSigEmpty = false;
    const p = point(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };
  const move = (event) => {
    if (!drawing) return;
    event.preventDefault();
    const p = point(event);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };
  const end = () => { drawing = false; };
  canvas.onmousedown = start;
  canvas.onmousemove = move;
  canvas.onmouseup = end;
  canvas.onmouseleave = end;
  canvas.ontouchstart = start;
  canvas.ontouchmove = move;
  canvas.ontouchend = end;
  window._passSigEmpty = true;
  window._passSigPad = canvas;
}
function passSignatureFile() {
  const canvas = window._passSigPad || document.getElementById("passSigPad");
  if (!canvas || window._passSigEmpty) return null;
  const out = document.createElement("canvas");
  out.width = canvas.width;
  out.height = canvas.height;
  const ctx = out.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(canvas, 0, 0);
  try { return dataUrlToFile(out.toDataURL("image/png"), "signature.png"); } catch (_) { return null; }
}
function compressPassSignature(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("image"));
      return;
    }
    const img = new Image();
    const blobURL = URL.createObjectURL(file);
    const budget = 200 * 240;
    img.onload = () => {
      URL.revokeObjectURL(blobURL);
      let maxW = 1280;
      let maxH = 320;
      let quality = 0.92;
      let dataUrl = "";
      for (let step = 0; step < 12; step += 1) {
        const scale = Math.min(1, maxW / Math.max(1, img.width), maxH / Math.max(1, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
        dataUrl = canvas.toDataURL("image/jpeg", quality);
        if ((dataUrl.split(",")[1] || "").length <= budget) {
          resolve(dataUrl);
          return;
        }
        if (quality > 0.72) quality = Math.max(0.72, quality - 0.04);
        else {
          maxW = Math.max(720, Math.round(maxW * 0.9));
          maxH = Math.max(180, Math.round(maxH * 0.9));
        }
      }
      resolve(dataUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(blobURL);
      reject(new Error("image"));
    };
    img.src = blobURL;
  });
}
function setIssuePassError(message) {
  const node = document.getElementById("issuePassError");
  if (node) node.textContent = message || "";
  const ok = document.getElementById("issuePassOk");
  if (ok && message) ok.classList.add("hidden");
}
async function lookupAsSignedIn(names) {
  const unique = [...new Set((names || []).map((name) => String(name || "").trim()).filter(Boolean))];
  if (!ckWebAuthToken() || !unique.length) return [];
  const found = [];
  for (let start = 0; start < unique.length; start += 150) {
    const slice = unique.slice(start, start + 150);
    try {
      const response = await fetch(restPublicUrl("records/lookup", false), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ records: slice.map((recordName) => ({ recordName })) })
      });
      const payload = await response.json();
      recordsFrom(payload).filter(usableRecord).forEach((record) => found.push(record));
    } catch (_) {}
  }
  return found;
}
async function saveStaffPassBody(id, body) {
  if (!ckWebAuthToken() || !id) return false;
  let text = "";
  try { text = JSON.stringify(body || {}); } catch (_) { return false; }
  const sealed = await sealStaffBody(text);
  if (sealed.indexOf(STAFF_BODY_PREFIX) !== 0 || sealed.length > 900000) return false;
  const record = {
    recordType: CAMPUS_TYPE,
    recordName: "body." + id,
    fields: {
      kind: { value: "body" },
      passIDs: { value: sealed }
    }
  };
  try {
    await restModify(record, "create");
    return true;
  } catch (_) {
    try { await restModify(record, "forceUpdate"); return true; } catch (_) { return false; }
  }
}
async function applyStaffBodies(records) {
  const hiddenField = (value) => {
    const raw = String(value || "");
    return raw.indexOf("whs1.") === 0 || raw === "whs0.";
  };
  const need = (records || []).filter((record) => ["studentName", "destination", "dates", "teacherName"].some((key) => hiddenField(fieldValue(record, key))));
  if (!need.length) return;
  const bodies = await lookupAsSignedIn(need.map((record) => "body." + passRecordName(record)));
  const byName = new Map(bodies.map((record) => [String(record.recordName || "").toLowerCase(), record]));
  for (const record of need) {
    const body = byName.get(("body." + passRecordName(record)).toLowerCase());
    if (!body) continue;
    let parsed = null;
    try { parsed = JSON.parse(await openStaffBody(fieldValue(body, "passIDs") || "")); } catch (_) { parsed = null; }
    if (!parsed) continue;
    if (String(fieldValue(body, "passIDs") || "").indexOf(STAFF_BODY_PREFIX) !== 0 && verifiedStaffRole()) {
      await saveStaffPassBody(passRecordName(record), parsed);
    }
    record.fields = record.fields || {};
    ["studentName", "destination", "dates", "teacherName", "kind"].forEach((key) => {
      if (parsed[key]) record.fields[key] = { value: parsed[key] };
    });
    const sig = String(parsed.signature || "");
    if (sig.indexOf("data:") === 0) record._passIcon = sig;
    else if (sig) record._passIcon = "data:image/jpeg;base64," + sig;
  }
}
// Student codes are passwords. Teachers' browsers keep them only to finish locking a pass,
// so hold at most the 50 newest for 7 days.
const PASS_CODE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
const PASS_CODE_MAX_COUNT = 50;
function loadPassCodes() {
  let map = {};
  try { map = JSON.parse(localStorage.getItem("whsPassWebKeys") || "{}") || {}; } catch (_) { map = {}; }
  const now = Date.now();
  const rows = Object.keys(map).map((id) => {
    const entry = map[id];
    // Older saves stored a bare code; treat them as saved now so they age out normally.
    if (typeof entry === "string") return [id, { c: entry, t: now }];
    return [id, entry && typeof entry === "object" ? entry : { c: "", t: 0 }];
  }).filter(([, entry]) => normalizeCode(entry.c).length === 10 && now - Number(entry.t || 0) <= PASS_CODE_MAX_AGE);
  rows.sort((a, b) => Number(b[1].t) - Number(a[1].t));
  return Object.fromEntries(rows.slice(0, PASS_CODE_MAX_COUNT));
}
function savePassCodes(map) {
  try {
    if (Object.keys(map).length) localStorage.setItem("whsPassWebKeys", JSON.stringify(map));
    else localStorage.removeItem("whsPassWebKeys");
  } catch (_) {}
}
function rememberedPassCode(id) {
  const map = loadPassCodes();
  savePassCodes(map);
  const code = normalizeCode((map[id] && map[id].c) || "");
  return code.length === 10 ? code : "";
}
function rememberPassCode(id, code) {
  const key = normalizeCode(code);
  if (!id || key.length !== 10) return;
  const map = loadPassCodes();
  const latest = Math.max(0, ...Object.values(map).map((entry) => Number(entry.t || 0)));
  map[id] = { c: key, t: Math.max(Date.now(), latest + 1) };
  savePassCodes(loadPassCodesFrom(map));
}
function loadPassCodesFrom(map) {
  const rows = Object.entries(map).sort((a, b) => Number(b[1].t) - Number(a[1].t));
  return Object.fromEntries(rows.slice(0, PASS_CODE_MAX_COUNT));
}
function dropPassFieldCache() {
  try {
    const drop = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const name = localStorage.key(i);
      if (name && name.indexOf("whsPassCache:") === 0) drop.push(name);
    }
    drop.forEach((name) => localStorage.removeItem(name));
  } catch (_) {}
}
function writePassCache() { dropPassFieldCache(); }
function applyPassCache() {}
dropPassFieldCache();
async function publishSealRecord(id, code, body) {
  const key = normalizeCode(code);
  if (!id || key.length !== 10) return false;
  const payload = {
    studentName: await sealText(key, body.studentName),
    destination: await sealText(key, body.destination),
    dates: await sealText(key, body.dates),
    teacherName: await sealText(key, body.teacherName)
  };
  if (body.signature) {
    const sealed = await sealText(key, body.signature);
    if (String(sealed).indexOf("whs1.") === 0 && sealed.length < 700000) payload.signature = sealed;
  }
  if (String(payload.studentName).indexOf("whs1.") !== 0) return false;
  const record = {
    recordType: "WHSWebProfile",
    recordName: "seal." + id,
    fields: {
      role: { value: "student" },
      displayName: { value: "Seal" },
      gradeSeal: { value: JSON.stringify(payload) }
    }
  };
  try { await restModifySchool(record, "create"); return true; } catch (_) {}
  try { await restModify(record, "create"); return true; } catch (_) {}
  try { await restModify(record, "forceUpdate"); return true; } catch (_) { return false; }
}
async function redactPassImages(id, sealedSignature) {
  let heads = [];
  try { heads = await restLookupExact(["passimg." + id + ".0"]); } catch (_) { return; }
  const head = heads[0];
  if (!head) return;
  const count = Math.min(200, Math.max(1, parseInt(fieldValue(head, "dates"), 10) || 1));
  for (let i = 0; i < count; i += 1) {
    const sealed = i === 0 && String(sealedSignature || "").indexOf("whs1.") === 0;
    const record = {
      recordType: PASS_TYPE,
      recordName: "passimg." + id + "." + i,
      fields: {
        kind: { value: "passimg" },
        studentName: { value: id },
        destination: { value: sealed ? sealedSignature : "whs0." },
        dates: { value: sealed ? "1" : "0" }
      }
    };
    try { await restModify(record, "forceUpdate"); } catch (_) {}
  }
}
async function protectPlainPasses(records) {
  if (!canSeePassLog()) return;
  for (const record of records || []) {
    const id = passRecordName(record);
    const name = String(fieldValue(record, "studentName") || "");
    if (!id || name.indexOf("whs1.") === 0 || name === "whs0.") continue;
    const body = {
      studentName: name,
      destination: fieldValue(record, "destination"),
      dates: fieldValue(record, "dates"),
      teacherName: fieldValue(record, "teacherName"),
      kind: fieldValue(record, "kind") || "hallway",
      signature: record._passIcon || ""
    };
    const code = rememberedPassCode(id);
    if (code) {
      if (!(await saveStaffPassBody(id, body))) continue;
      const signature = body.signature ? await sealText(code, body.signature) : "";
      try {
        await restModify({
          recordType: PASS_TYPE,
          recordName: id,
          fields: {
            studentName: { value: await sealText(code, body.studentName) },
            destination: { value: await sealText(code, body.destination) },
            dates: { value: await sealText(code, body.dates) },
            teacherName: { value: await sealText(code, body.teacherName) }
          }
        }, "forceUpdate");
      } catch (_) { continue; }
      await redactPassImages(id, signature);
      continue;
    }
    let seal = null;
    try { seal = await readExact("seal." + id); } catch (_) { seal = null; }
    let parsed = null;
    try { parsed = JSON.parse(fieldValue(seal, "gradeSeal") || ""); } catch (_) { parsed = null; }
    if (!(parsed && String(parsed.studentName || "").indexOf("whs1.") === 0)) continue;
    if (!(await saveStaffPassBody(id, body))) continue;
    try {
      await restModify({
        recordType: PASS_TYPE,
        recordName: id,
        fields: {
          studentName: { value: parsed.studentName },
          destination: { value: parsed.destination || "" },
          dates: { value: parsed.dates || "" },
          teacherName: { value: parsed.teacherName || "" }
        }
      }, "forceUpdate");
    } catch (_) { continue; }
    await redactPassImages(id, parsed.signature || "");
  }
}
async function revealStudentPasses(records, code) {
  const key = normalizeCode(code);
  if (key.length !== 10) return;
  for (const record of records || []) {
    for (const field of ["studentName", "destination", "dates", "teacherName"]) {
      const raw = String(fieldValue(record, field) || "");
      if (raw.indexOf("whs1.") !== 0) continue;
      const open = await openSeal(key, raw);
      if (!open) continue;
      record.fields = record.fields || {};
      record.fields[field] = { value: open };
    }
  }
}
async function readAsSignedIn(name) {
  if (!ckWebAuthToken() || !name) return null;
  try {
    const response = await fetch(restPublicUrl("records/lookup", false), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ records: [{ recordName: name }] })
    });
    const payload = await response.json();
    const wanted = String(name).toLowerCase();
    return recordsFrom(payload).filter(usableRecord).find((item) => String(item.recordName || "").toLowerCase() === wanted) || null;
  } catch (_) {
    return null;
  }
}
async function readExact(name) {
  try {
    if (ckWebAuthToken()) {
      const signed = await readAsSignedIn(name);
      if (signed) return signed;
    }
    return (await restLookupExact([name]))[0] || null;
  } catch (_) { return null; }
}
function indexIDs(record) {
  return parsePassIDs(record && fieldValue(record, "passIDs"));
}
async function campusHiddenFromWorld(name) {
  const token = schoolToken();
  if (!token) return false;
  try {
    const response = await fetch(restPublicUrl("records/lookup", true), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ records: [{ recordName: name }] })
    });
    const payload = await response.json();
    const row = (payload.records || []).find((item) => String(item.recordName || "").toLowerCase() === String(name || "").toLowerCase());
    if (!row) return false;
    const err = String(row.serverErrorCode || row.reason || "").toUpperCase();
    if (/NOT_FOUND|ACCESS_DENIED|PERMISSION|AUTHENTICATION|UNAUTHORIZED/.test(err)) return true;
    if (fieldValue(row, "kind") || fieldValue(row, "passIDs")) return false;
    return !!err;
  } catch (_) {
    return false;
  }
}
async function writeIndexRecord(type, name, kind, ids, merge) {
  const staffOnly = type === CAMPUS_TYPE;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const existing = await readExact(name);
    const record = {
      recordType: type,
      recordName: name,
      fields: {
        kind: { value: kind },
        passIDs: { value: (merge ? [...new Set((ids || []).concat(indexIDs(existing)))].slice(0, 500) : (ids || [])).join(",") }
      }
    };
    if (existing && existing.recordChangeTag) record.recordChangeTag = existing.recordChangeTag;
    try {
      if (existing && existing.recordChangeTag) {
        try {
          await restModify(record, "update");
          return true;
        } catch (error) {
          if (isConflictError(error)) continue;
        }
      }
      if (!staffOnly) {
        try {
          await restModifySchool(record, existing ? "forceUpdate" : "create");
          return true;
        } catch (error) {
          if (isConflictError(error)) continue;
        }
      }
      try {
        await restModify(record, existing ? "forceUpdate" : "create");
        return true;
      } catch (error) {
        if (isConflictError(error)) continue;
      }
      if (await ckCreateRecords([record])) return true;
    } catch (error) {
      if (isConflictError(error) && attempt < 5) continue;
      return false;
    }
  }
  return false;
}
async function storePassIndex(privateName, publicName, kind, ids, merge) {
  const capped = (ids || []).slice(0, 500);
  const privateOK = await writeIndexRecord(CAMPUS_TYPE, privateName, kind, capped, !!merge);
  const hide = privateOK && await campusHiddenFromWorld(privateName);
  const publicIDs = hide ? [] : capped;
  if (!publicIDs.length) {
    const existing = await readExact(publicName);
    if (!existing || !indexIDs(existing).length) return privateOK;
  }
  await writeIndexRecord(PASS_TYPE, publicName, kind, publicIDs, hide ? false : !!merge);
  return privateOK;
}
function inboxNames(key) {
  const code = normalizeCode(key);
  if (code.length !== 10) return [];
  const names = [];
  for (let i = 0; i < 160; i += 1) names.push("inbox." + code + "." + i);
  return names;
}
function privateInboxNames(tag) {
  const code = String(tag || "").trim().toLowerCase();
  if (code.length !== 24) return [];
  const names = [];
  for (let i = 0; i < 160; i += 1) names.push("inbox.p." + code + "." + i);
  return names;
}
async function studentInboxNames(key) {
  const tag = await privateCodeTag(key);
  return privateInboxNames(tag).concat(inboxNames(key));
}
async function deliverPassToInbox(passId, webCode, studentName) {
  const key = normalizeCode(webCode);
  const id = String(passId || "").trim();
  if (key.length !== 10 || !id) return false;
  const tag = await privateCodeTag(key);
  const names = privateInboxNames(tag);
  const known = names.concat(inboxNames(key));
  let existing = [];
  try { existing = await restLookupExact(known); } catch (_) { existing = []; }
  const taken = new Set(existing.map((record) => String(record.recordName || "").toLowerCase()));
  const already = existing.some((record) => parsePassIDs(fieldValue(record, "passIDs")).some((item) => item.toLowerCase() === id.toLowerCase()));
  if (already) return true;
  const sealedName = await sealText(key, studentName || "");
  const fields = {
    kind: { value: "inbox" },
    passIDs: { value: id },
    destination: { value: tag },
    studentName: { value: sealedName }
  };
  for (const name of names) {
    if (taken.has(name.toLowerCase())) continue;
    try {
      await createPassRecord({ recordType: PASS_TYPE, recordName: name, fields }, "create");
      return true;
    } catch (error) {
      taken.add(name.toLowerCase());
      if (isAuthError(error)) throw error;
    }
  }
  const reuse = names.find((name) => taken.has(name.toLowerCase())) || names[0];
  if (!reuse) return false;
  try {
    await createPassRecord({ recordType: PASS_TYPE, recordName: reuse, fields }, "forceUpdate");
    return true;
  } catch (error) {
    if (isAuthError(error)) throw error;
  }
  return false;
}
async function attachPassToStudent(passId, webCode, studentName) {
  const key = normalizeCode(webCode);
  if (key.length !== 10) throw Object.assign(new Error("CODE"), { code: "CODE" });
  await deliverPassToInbox(passId, key, studentName);
  let profileRec = null;
  try { profileRec = (await fetchByNames(cloudDb(), [key]))[0] || null; } catch (_) {}
  const role = normalizeRole(fieldValue(profileRec, "role"));
  if (profileRec && role && role !== "student" && role !== "guest") {
    throw Object.assign(new Error("CODE"), { code: "CODE" });
  }
  const name = studentName || fieldValue(profileRec, "displayName") || fieldValue(profileRec, "firstName") || "";
  if (profileRec) {
    const ids = capNewestIDs(parsePassIDs(fieldValue(profileRec, "passIDs")), passId, 400);
    const rec = {
      recordType: "WHSWebProfile",
      recordName: profileRec.recordName || key,
      fields: { passIDs: { value: ids.join(",") } }
    };
    if (profileRec.recordChangeTag) rec.recordChangeTag = profileRec.recordChangeTag;
    try { await restModifySchool(rec, "forceUpdate"); } catch (_) {
      try { await ckCreateRecords([rec]); } catch (_) {
        try { await restModify(rec, "update"); } catch (_) {}
      }
    }
  }
  const tag = await privateCodeTag(key);
  const linkName = tag ? "webpass.p." + tag : "webpass." + key;
  let link = null;
  try { link = (await fetchByNames(cloudDb(), [linkName]))[0] || null; } catch (_) {}
  const ids = capNewestIDs(parsePassIDs(fieldValue(link, "passIDs")), passId, 400);
  const record = {
    recordType: PASS_TYPE,
    recordName: linkName,
    fields: {
      kind: { value: "webpass" },
      passIDs: { value: ids.join(",") },
      studentName: { value: await sealText(key, name) }
    }
  };
  if (link && link.recordChangeTag) record.recordChangeTag = link.recordChangeTag;
  try {
    await restModifySchool(record, link ? "forceUpdate" : "create");
  } catch (_) {
    try {
      if (record.recordChangeTag) await ckCreateRecords([record]);
      else await ckCreateNews(record);
    } catch (_) {
      await restModify(record, link ? "forceUpdate" : "create");
    }
  }
}
async function attachPassIcon(recordName, file, onProgress, sealCode) {
  if (!recordName || !file) return;
  const note = (value) => { if (typeof onProgress === "function") onProgress(value); };
  try {
    const dataUrl = await compressPassSignature(file);
    note(0.12);
    const parts = chunkNewsImage(dataUrl, 200);
    const code = normalizeCode(sealCode || "");
    const records = [];
    for (let i = 0; i < parts.length; i += 1) {
      const chunk = code.length === 10 ? await sealText(code, parts[i]) : parts[i];
      records.push({
        recordType: PASS_TYPE,
        recordName: "passimg." + recordName + "." + i,
        fields: {
          kind: { value: "passimg" },
          studentName: { value: recordName },
          destination: { value: chunk },
          dates: { value: String(parts.length) }
        }
      });
    }
    const db = cloudDb();
    if (db && typeof db.newRecordsBatch === "function") {
      const batch = db.newRecordsBatch();
      records.forEach((record) => { batch.create(record); });
      note(0.35);
      const result = await batch.commit();
      if (!(result && result.hasErrors)) {
        note(1);
        return;
      }
    }
    for (let i = 0; i < records.length; i += 1) {
      try { await ckCreateNews(records[i]); } catch (_) {
        try { await restModify(records[i], "forceUpdate"); } catch (_) {
          try { await restModifySchool(records[i], "create"); } catch (_) {}
        }
      }
      note(0.35 + ((i + 1) / Math.max(records.length, 1)) * 0.65);
    }
    note(1);
  } catch (_) {}
}
function newPassRecordName() {
  if (crypto.randomUUID) return crypto.randomUUID().toUpperCase();
  const bytes = new Uint8Array(16);
  if (crypto.getRandomValues) crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join("-").toUpperCase();
}
async function issuePassFromWeb() {
  if (!canIssuePass() || window._issuePassSending) return;
  const c = t();
  const studentName = String((document.getElementById("issueStudent") || {}).value || "").trim();
  const destination = String((document.getElementById("issueDestination") || {}).value || "").trim();
  const dates = String((document.getElementById("issueDates") || {}).value || "").trim();
  const webCode = String((document.getElementById("issueWebCode") || {}).value || "").trim();
  const signature = passSignatureFile();
  const kind = window._issuePassKind === "hallway" ? "hallway" : "flex";
  if (!studentName || !destination || !dates || !signature || normalizeCode(webCode).length !== 10) {
    setIssuePassError(c.issuePassNeedFields);
    return;
  }
  const renewWindow = window._appleReady && !window._appleNeedsRenew ? null : window.open("", "whsAppleRenew", "width=640,height=720");
  const sendTicket = {};
  window._issuePassSending = sendTicket;
  window._pendingIssuePass = false;
  const button = document.getElementById("issuePassBtn");
  if (button) button.disabled = true;
  setIssuePassError("");
  window._issuePassBusy = true;
  try {
    showWorkProgress(8, c.issuePassWorking, c.issuePassStepSave, "", false, "finishIssuePass");
    await ensureCloud();
    try { await restoreStaffCloudSession(); } catch (_) {}
    if (window._appleNeedsRenew || !ckWebAuthToken()) {
      showWorkProgress(12, c.issuePassWorking, c.issuePassNeedApple, "", false, "finishIssuePass");
      const renewed = await renewAppleForSend(renewWindow);
      if (!renewed) throw Object.assign(new Error("APPLE"), { apple: true });
    } else if (renewWindow && !renewWindow.closed) {
      renewWindow.close();
    }
    if (!ckWebAuthToken()) throw Object.assign(new Error("APPLE"), { apple: true });
    window._issuePassAwaitingApple = false;
    window._pendingIssuePass = false;
    keepAppleSessionFresh();
    await requireEnrolledStaff();
    const recordName = newPassRecordName();
    const teacherName = (profile && (profile.displayName || profile.firstName)) || "WHS";
    const code = normalizeCode(webCode);
    showWorkProgress(22, c.issuePassWorking, c.issuePassStepSave, "", false, "finishIssuePass");
    const dataUrl = await compressPassSignature(signature);
    const bodyOK = await saveStaffPassBody(recordName, { studentName, destination, dates, teacherName, kind, signature: dataUrl });
    if (!bodyOK) throw Object.assign(new Error("FAIL"), { reason: "body" });
    const fields = {
      kind: { value: kind },
      studentName: { value: await sealText(code, studentName) },
      destination: { value: await sealText(code, destination) },
      dates: { value: await sealText(code, dates) },
      teacherName: { value: await sealText(code, teacherName) }
    };
    if (["studentName", "destination", "dates", "teacherName"].some((key) => String(fields[key].value).indexOf("whs1.") !== 0)) {
      throw Object.assign(new Error("FAIL"), { reason: "seal" });
    }
    let saved = await createPassRecord({ recordType: PASS_TYPE, recordName, fields }, "create");
    if (!saved) {
      try { saved = (await fetchByNames(cloudDb(), [recordName]))[0] || null; } catch (_) {}
    }
    if (!saved) throw Object.assign(new Error("FAIL"), { reason: "create" });
    rememberPassCode(recordName, webCode);
    auditLog("issue_pass", [recordName]);
    showWorkProgress(40, c.issuePassWorking, c.issuePassStepSave, "", false, "finishIssuePass");
    showWorkProgress(55, c.issuePassWorking, c.issuePassStepStudent, "", false, "finishIssuePass");
    await attachPassToStudent(recordName, webCode, studentName);
    const sealIcon = true;
    showWorkProgress(68, c.issuePassWorking, c.issuePassStepSignature, "", false, "finishIssuePass");
    try {
      await attachPassIcon(recordName, signature, (part) => {
        showWorkProgress(68 + Math.round(part * 28), c.issuePassWorking, c.issuePassStepSignature, "", false, "finishIssuePass");
      }, sealIcon ? webCode : "");
    } catch (_) {}
    window._pendingIssuePass = false;
    window._appleReady = true;
    window._appleNeedsRenew = false;
    const ok = document.getElementById("issuePassOk");
    if (ok) {
      ok.textContent = c.issuePassDone;
      ok.classList.remove("hidden");
    }
    const student = document.getElementById("issueStudent");
    const dest = document.getElementById("issueDestination");
    const codeInput = document.getElementById("issueWebCode");
    if (student) student.value = "";
    if (dest) dest.value = "";
    if (codeInput) codeInput.value = "";
    bindPassSignaturePad();
    window._issuePassBusy = false;
    showWorkProgress(100, c.issuePassDone, "", "", true, "finishIssuePass");
  } catch (error) {
    window._issuePassBusy = false;
    const apple = (error && error.apple) || error.message === "APPLE" || isAuthError(error);
    window._pendingIssuePass = !!apple;
    if (apple && window._applePopupBlocked) showAppleStep();
    const staff = error && (error.staff || error.message === "STAFF");
    const badCode = error && (error.code === "CODE" || error.message === "CODE");
    const message = apple ? c.issuePassNeedApple : (staff ? c.issuePassNeedStaff : (badCode ? c.issuePassBadCode : c.issuePassFail));
    setIssuePassError(message);
    showWorkProgress(100, message, "", "", true, "finishIssuePass");
  } finally {
    if (window._issuePassSending === sendTicket) window._issuePassSending = null;
    const again = document.getElementById("issuePassBtn");
    if (again) again.disabled = false;
  }
}

function passSignatureSrc(record) {
  const icon = String((record && record._passIcon) || "");
  if (icon.indexOf("data:") === 0) return icon;
  const direct = String(fieldValue(record, "signature") || "");
  if (direct.indexOf("data:") === 0) return direct;
  return icon;
}
function passPaper(record, enlarged) {
  const c = t();
  const kind = fieldValue(record, "kind") === "flex" ? c.flex : c.hallway;
  const signature = passSignatureSrc(record);
  return `<article class="paper${enlarged ? " big" : ""}">
    <div class="paper-head"><img class="paper-w-img" src="./WHSBlockW.png" alt=""><div class="paper-title">${kind}</div></div>
    <div class="paper-field"><div class="lab">${c.studentNameLabel}</div><div class="val">${escapeHtml(fieldValue(record, "studentName"))}</div></div>
    <div class="paper-field"><div class="lab">${c.destinationLabel}</div><div class="val">${escapeHtml(fieldValue(record, "destination"))}</div></div>
    <div class="paper-field"><div class="lab">${c.datesLabel}</div><div class="val">${escapeHtml(fieldValue(record, "dates"))}</div></div>
    <div class="paper-sign">
      <div class="lab">${c.signature}</div>
      ${signature ? `<img alt="" src="${escapeHtml(signature)}">` : ""}
      <div class="s">${escapeHtml(fieldValue(record, "teacherName"))}</div>
    </div>
  </article>`;
}

function paintStudentPasses(usable) {
  const c = t();
  const list = document.getElementById("view-mypasses");
  const tileSub = document.getElementById("passTileSub");
  window._studentPassUsable = usable || [];
  if (tileSub) {
    if (!usable.length) tileSub.textContent = c.noneYet;
    else {
      const first = usable[0];
      const teacher = fieldValue(first, "teacherName");
      const dest = fieldValue(first, "destination");
      tileSub.textContent = dest ? `${teacher} · ${dest}` : (teacher || c.yourPasses);
    }
  }
  if (!(list && view === "mypasses")) return;
  if (!usable.length) {
    list.innerHTML = `${backBar()}<p class="muted">${c.noStudentPasses}</p>`;
    return;
  }
  window._passRecords = window._passRecords || {};
  list.innerHTML = backBar() + usable.map((record) => {
    const id = record.recordName || fieldValue(record, "recordName") || String(Math.random());
    window._passRecords[id] = record;
    return `<button type="button" class="action" style="margin-bottom:12px;max-width:560px;" data-action="openPass" data-pass-id="${escapeHtml(id)}">${passPaper(record, false)}</button>`;
  }).join("");
}
async function loadStudentPasses() {
  const c = t();
  const list = document.getElementById("view-mypasses");
  if (!canSeeOwnPasses()) return;
  if (window._studentPassUsable && window._studentPassUsable.length) paintStudentPasses(window._studentPassUsable);
  else if (list && view === "mypasses") list.innerHTML = `${backBar()}<p class="muted">${c.yourPasses}</p>`;
  if (!schoolToken()) {
    paintStudentPasses([]);
    return;
  }
  try { await ensureCloud(); } catch (_) {}
  try {
    const key = normalizeCode(profile.key);
    const dashed = key.length === 10 ? `${key.slice(0, 5)}-${key.slice(5)}` : "";
    const tag = await privateCodeTag(key);
    const profiles = await restLookupExact([key, dashed, "webpass." + key, tag ? "webpass.p." + tag : "", dashed ? "webpass." + dashed : ""].concat(await studentInboxNames(key)));
    const ids = [...new Set(profiles.flatMap((record) => parsePassIDs(fieldValue(record, "passIDs"))))];
    const packed = await fetchByNames(cloudDb(), ids.concat(ids.flatMap((id) => [revokedName(id), tombstoneName(id)]), [CLEARED]));
    const byName = new Map(packed.map((record) => [String(record.recordName || "").toLowerCase(), record]));
    window._revokedPassIDs = collectRevokedIDs(packed);
    const usable = ids.map((id) => byName.get(id.toLowerCase())).filter((record) => {
      if (!(record && (fieldValue(record, "studentName") || fieldValue(record, "teacherName")))) return false;
      if (isPassMarker(record) || passIsRevoked(record)) return false;
      return true;
    });
    const plainPasses = usable.filter((record) => {
      const name = String(fieldValue(record, "studentName") || "");
      return name && name.indexOf("whs1.") !== 0 && name !== "whs0.";
    });
    await revealStudentPasses(usable, key);
    applyPassCache(usable, key);
    paintStudentPasses(usable);
    await applyPassIcons(usable);
    writePassCache(key, usable);
    for (const record of plainPasses) {
      const id = passRecordName(record);
      await publishSealRecord(id, key, {
        studentName: fieldValue(record, "studentName"),
        destination: fieldValue(record, "destination"),
        dates: fieldValue(record, "dates"),
        teacherName: fieldValue(record, "teacherName"),
        signature: record._passIcon || ""
      });
    }
    paintStudentPasses(usable);
  } catch (error) {
    if (list && view === "mypasses" && !(window._studentPassUsable && window._studentPassUsable.length)) {
      list.innerHTML = `${backBar()}<p class="error">${escapeHtml(error.message)}</p>`;
    }
  }
}

function openPass(id) {
  const record = window._passRecords && window._passRecords[id];
  if (!record) return;
  const c = t();
  const revoked = passIsRevoked(record);
  let extra = "";
  if (view === "passes" && canRevokePass()) {
    extra = revoked
      ? `<p class="muted" style="margin-top:12px;">${c.revokePassDone}</p>`
      : `<button class="ghost" type="button" data-action="askRevokePass" data-pass-id="${escapeHtml(id)}" style="width:100%;margin-top:12px;color:#B42318;">${c.revokePass}</button>`;
  }
  openSheet(`
    <div class="card-title"><button type="button" data-action="closeSheet">${c.close}</button></div>
    ${passPaper(record, true)}
    ${extra}`);
}

function newsHeading(record) {
  return lang === "es"
    ? (fieldValue(record, "titleES") || fieldValue(record, "titleEN"))
    : (fieldValue(record, "titleEN") || fieldValue(record, "titleES"));
}
function newsBody(record) {
  return lang === "es"
    ? (fieldValue(record, "subtitleES") || fieldValue(record, "subtitleEN"))
    : (fieldValue(record, "subtitleEN") || fieldValue(record, "subtitleES"));
}
function newsStamp(record) {
  const raw = record && record.fields && record.fields.postedAt && record.fields.postedAt.value;
  const value = typeof raw === "number" ? raw : Date.parse(fieldValue(record, "postedAt"));
  if (!value) return 0;
  return value;
}
function bundledNewsItems() {
  const c = t();
  return [
    { id: "alumni-spotlight", image: "./news/AlumniSpotlight.jpg", title: c.alumniTitle, subtitle: c.alumniSubtitle, published: 3, stamp: 3 },
    { id: "nths-applications", image: "./news/NTHSPoster.jpg", title: c.nthsTitle, subtitle: c.nthsSubtitle, published: 2, stamp: 2 },
    { id: "publishing-fundraiser", image: "./news/PublishingFundraiser.jpg", title: c.publishingTitle, subtitle: c.publishingSubtitle, published: 1, stamp: 1 }
  ];
}
function wireCard() {
  const c = t();
  return `<a class="card action wide" href="https://whswarriorswire.com" target="_blank" rel="noopener">
    <div class="row-item">
      <img class="tile-wire" src="./WarriorsWire.png" alt="">
      <div><div class="t">${c.wire}</div><div class="s">${c.wireSub}</div></div>
      <span class="chev">›</span>
    </div>
  </a>`;
}
function newsPage(feedInner) {
  return `<div class="dash">${backBar()}${wireCard()}<div class="card wide">${feedInner}</div></div>`;
}
function newsRowsHTML(items) {
  const c = t();
  if (!items.length) return `<p class="muted" style="margin:8px 0 0;">${c.newsEmpty}</p>`;
  return items.map((item) => {
    const art = item.image
      ? `<img class="news-art" alt="" src="${escapeHtml(item.image)}">`
      : `<span class="news-art empty">${icons.mega}</span>`;
    return `<button class="news-row" type="button" data-action="openNewsItem" data-news-id="${escapeHtml(item.id)}">
      ${art}
      <span><div class="t">${escapeHtml(item.title)}</div><div class="s">${escapeHtml(item.subtitle)}</div></span>
    </button>`;
  }).join("");
}
function paintNews(items) {
  window._newsItems = {};
  items.forEach((item) => { window._newsItems[item.id] = item; });
  const c = t();
  const rows = newsRowsHTML(items);
  const home = document.getElementById("homeNews");
  if (home) home.innerHTML = `<div class="t" style="margin-bottom:8px;">${c.newsFeed}</div>${rows}`;
  if (view === "news") {
    document.getElementById("view-news").innerHTML = newsPage(`<div class="t" style="margin-bottom:8px;">${c.newsFeed}</div>${rows}`);
  }
  if (view === "posts") paintAdminNews(items);
}
function isManagedNewsPost(id) {
  const key = String(id || "");
  if (!key || key === NEWS_MANIFEST) return false;
  return !bundledNewsItems().some((item) => item.id === key);
}
function adminNewsRowsHTML(items) {
  const c = t();
  const posts = (items || []).filter((item) => isManagedNewsPost(item.id));
  if (!posts.length) return `<p class="muted" style="margin:8px 0 0;">${c.postsEmpty}</p>`;
  return posts.map((item) => {
    const art = item.image
      ? `<img class="news-art" alt="" src="${escapeHtml(item.image)}">`
      : `<span class="news-art empty">${icons.mega}</span>`;
    return `<div class="news-row admin-post">
      ${art}
      <span style="flex:1;min-width:0"><div class="t">${escapeHtml(item.title)}</div><div class="s">${escapeHtml(item.subtitle)}</div></span>
      <button class="ghost news-delete" type="button" data-action="askDeleteNews" data-news-id="${escapeHtml(item.id)}">${c.deletePost}</button>
    </div>`;
  }).join("");
}
function paintAdminNews(items) {
  const list = document.getElementById("adminNewsList");
  if (!list) return;
  list.innerHTML = adminNewsRowsHTML(items);
}
function renderPosts() {
  if (!canPostNews()) return;
  const c = t();
  document.getElementById("view-posts").innerHTML = `<div class="dash">
    <div class="card wide">
      <div class="t">${c.composeNews}</div>
      <p class="muted">${c.composeNewsBody}</p>
      <div class="sheet-field"><span>${c.newsImageLabel}</span>
        <input id="newsImage" class="hidden" type="file" accept="image/*">
        <button class="ghost" type="button" data-action="pickNewsImage" style="width:100%;">${c.newsPickImage}</button>
        <img id="newsImagePreview" class="news-compose-preview hidden" alt="">
      </div>
      <label class="sheet-field"><span>${c.newsTitleLabel}</span>
        <input id="newsTitle" type="text" maxlength="120" autocomplete="off">
      </label>
      <label class="sheet-field"><span>${c.newsStoryLabel}</span>
        <textarea id="newsStory" rows="4" maxlength="800"></textarea>
      </label>
      <p class="error" id="newsComposeError"></p>
      <p class="ok hidden" id="newsComposeOk"></p>
      <button class="primary" type="button" data-action="publishNews" id="newsPublishBtn">${c.newsPublish}</button>
    </div>
    <div class="card wide">
      <div class="t" style="margin-bottom:8px;">${c.postsList}</div>
      <div id="adminNewsList">${adminNewsRowsHTML(Object.values(window._newsItems || {}))}</div>
    </div>
  </div>`;
}
function confirmDeleteNews(id) {
  if (!canPostNews() || !isManagedNewsPost(id)) return;
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.deletePostTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.deletePostBody}</p>
    <button class="primary" type="button" data-action="closeSheet">${c.close}</button>
    <button class="ghost" type="button" data-action="deleteNews" data-news-id="${escapeHtml(id || "")}" style="width:100%;margin-top:8px;color:#B42318;">${c.deletePost}</button>`);
}
async function deleteNewsPost(id) {
  if (!canPostNews() || !isManagedNewsPost(id)) return;
  const c = t();
  window._pendingDeleteNewsId = id;
  try {
    await ensureCloud();
    watchAppleSignIn();
    if (!(await ensureSavedStaffSession())) throw Object.assign(new Error("APPLE"), { apple: true });
    const role = await requireEnrolledStaff();
    if (role !== "administrator") throw Object.assign(new Error("FAIL"), { reason: "staff" });
    let gone = false;
    const names = [id].concat(newsIconChunkNames(id));
    try { gone = await ckDeleteNames(names); } catch (error) {
      if (error && error.apple) throw error;
    }
    if (!gone) {
      try { gone = await restDeleteNames(names); } catch (error) {
        if (error && error.apple) throw error;
      }
    }
    await removeNewsFromManifest(id);
    window._pendingDeleteNewsId = "";
    closeSheet();
    await loadNewsFeed();
  } catch (error) {
    const apple = (error && error.apple) || error.message === "APPLE" || isAuthError(error);
    openSheet(`
      <div class="card-title"><b>${apple ? c.deletePostNeedApple : c.deletePostFail}</b><button type="button" data-action="closeSheet">${c.close}</button></div>`);
  }
}
function newsFieldRaw(record, key) {
  if (!record) return null;
  if (typeof record.get === "function") {
    try {
      const got = record.get(key);
      if (got != null) return got;
    } catch (_) {}
  }
  if (record[key] != null) return record[key];
  return record.fields && record.fields[key];
}
function newsImageParts(record) {
  let raw = newsFieldRaw(record, "imageParts");
  if (raw && typeof raw === "object" && Object.prototype.hasOwnProperty.call(raw, "value")) raw = raw.value;
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean);
  if (typeof raw === "string" && raw.trim()) return [raw.trim()];
  return [];
}
function newsImageFromRecord(record) {
  if (record && record._newsIcon) return record._newsIcon;
  const direct = fieldValue(record, "signature") || fieldValue(record, "newsImage") || fieldValue(record, "image");
  if (direct && (/^(https?:|data:|\.\/)/.test(direct) || direct.indexOf("${apiToken}") !== -1)) return direct;
  const parts = newsImageParts(record);
  return parts.length ? "data:image/jpeg;base64," + parts.join("") : "";
}
function newsIconChunkNames(id) {
  const names = [];
  for (let i = 0; i < 40; i += 1) names.push("newsimg." + id + "." + i);
  return names;
}
function applyNewsIcons(posts, chunks) {
  const grouped = {};
  (chunks || []).forEach((record) => {
    if (String(fieldValue(record, "kind") || "").toLowerCase() !== "newsimg") return;
    const parent = fieldValue(record, "studentName");
    const idx = Number(String(record.recordName || "").split(".").pop());
    if (!parent || !Number.isFinite(idx) || idx < 0) return;
    if (!grouped[parent]) grouped[parent] = [];
    grouped[parent][idx] = fieldValue(record, "destination");
  });
  (posts || []).forEach((record) => {
    const parts = (grouped[record.recordName] || []).filter(Boolean);
    if (parts.length) record._newsIcon = "data:image/jpeg;base64," + parts.join("");
  });
}
function rememberPassIconChunk(grouped, record) {
  if (String(fieldValue(record, "kind") || "").toLowerCase() !== "passimg") return;
  const parent = fieldValue(record, "studentName");
  const idx = Number(String(record.recordName || "").split(".").pop());
  if (!parent || !Number.isFinite(idx) || idx < 0) return;
  if (!grouped[parent]) grouped[parent] = [];
  grouped[parent][idx] = fieldValue(record, "destination");
}
async function probePassIconCount(recordName) {
  let count = 1;
  for (let start = 1; start < 200; start += 20) {
    const names = [];
    for (let i = start; i < Math.min(start + 20, 200); i += 1) names.push("passimg." + recordName + "." + i);
    let found = [];
    try { found = await restLookupExact(names); } catch (_) { return count; }
    const have = new Set(found.map((record) => Number(String(record.recordName || "").split(".").pop())));
    let advanced = false;
    for (let i = start; i < start + names.length; i += 1) {
      if (!have.has(i)) return count;
      count = i + 1;
      advanced = true;
    }
    if (!advanced) return count;
  }
  return count;
}
async function applyPassIcons(records) {
  const missing = (records || []).filter((record) => record && record.recordName && !record._passIcon && String(passSignatureSrc(record) || "").indexOf("data:") !== 0);
  if (!missing.length) return;
  const grouped = {};
  let heads = [];
  try { heads = await restLookupExact(missing.map((record) => "passimg." + record.recordName + ".0")); } catch (_) { return; }
  const counts = {};
  heads.forEach((record) => {
    rememberPassIconChunk(grouped, record);
    const parent = fieldValue(record, "studentName");
    const parsed = parseInt(fieldValue(record, "dates"), 10);
    if (parent) counts[parent] = Number.isFinite(parsed) && parsed > 0 ? Math.min(200, parsed) : 0;
  });
  const unknown = missing.filter((record) => counts[record.recordName] === 0);
  for (const record of unknown) {
    counts[record.recordName] = await probePassIconCount(record.recordName);
  }
  const rest = [];
  missing.forEach((record) => {
    const count = counts[record.recordName];
    if (!count || count < 2) return;
    for (let i = 1; i < count; i += 1) rest.push("passimg." + record.recordName + "." + i);
  });
  if (rest.length) {
    try { (await restLookupExact(rest)).forEach((record) => rememberPassIconChunk(grouped, record)); } catch (_) {}
  }
  const code = normalizeCode(profile && profile.key);
  for (const record of missing) {
    const rawParts = (grouped[record.recordName] || []).filter(Boolean);
    const parts = [];
    let broken = false;
    for (const part of rawParts) {
      if (part === "whs0.") { broken = true; break; }
      if (String(part).indexOf("whs1.") === 0) {
        if (code.length !== 10) { broken = true; break; }
        const open = await openSeal(code, part);
        if (!open) { broken = true; break; }
        parts.push(open);
      } else parts.push(part);
    }
    if (!broken && parts.length) {
      record._passIcon = parts.length === 1 && parts[0].indexOf("data:") === 0
        ? parts[0]
        : "data:image/jpeg;base64," + parts.join("");
    }
  }
}
function chunkNewsImage(dataUrl, maxParts) {
  const raw = String(dataUrl || "").split(",")[1] || "";
  const size = 240;
  const parts = [];
  for (let i = 0; i < raw.length; i += size) parts.push(raw.slice(i, i + size));
  return parts.slice(0, maxParts || 40);
}
function compressNewsIcon(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("image"));
      return;
    }
    const img = new Image();
    const blobURL = URL.createObjectURL(file);
    const budget = 40 * 240;
    img.onload = () => {
      URL.revokeObjectURL(blobURL);
      let max = 240;
      let quality = 0.62;
      let dataUrl = "";
      for (let step = 0; step < 10; step += 1) {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        dataUrl = canvas.toDataURL("image/jpeg", quality);
        if ((dataUrl.split(",")[1] || "").length <= budget) {
          resolve(dataUrl);
          return;
        }
        quality = Math.max(0.28, quality - 0.08);
        max = Math.max(80, Math.round(max * 0.78));
      }
      resolve(dataUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(blobURL);
      reject(new Error("image"));
    };
    img.src = blobURL;
  });
}
async function attachNewsIcon(recordName, imageParts) {
  const parts = (imageParts || []).filter(Boolean);
  if (!recordName || !parts.length) return;
  const records = parts.map((chunk, i) => ({
    recordType: PASS_TYPE,
    recordName: "newsimg." + recordName + "." + i,
    fields: {
      kind: { value: "newsimg" },
      studentName: { value: recordName },
      destination: { value: chunk },
      dates: { value: String(parts.length) }
    }
  }));
  const db = cloudDb();
  try {
    if (db && typeof db.newRecordsBatch === "function") {
      const batch = db.newRecordsBatch();
      records.forEach((record) => { batch.create(record); });
      const result = await batch.commit();
      if (!(result && result.hasErrors)) return;
    }
  } catch (_) {}
  try {
    if (db && typeof db.saveRecords === "function") {
      const result = await db.saveRecords(records);
      if (!(result && result.hasErrors)) return;
    }
  } catch (_) {}
  for (const record of records) {
    try { await createPassRecord(record, "create"); } catch (_) {
      try { await restModifySchool(record, "create"); } catch (_) {}
    }
  }
}
function newsItemFromPass(record) {
  const created = record && record.created && typeof record.created.timestamp === "number" ? record.created.timestamp : newsStamp(record);
  return {
    id: record.recordName || "",
    image: newsImageFromRecord(record),
    title: fieldValue(record, "studentName") || newsHeading(record),
    subtitle: fieldValue(record, "destination") || newsBody(record),
    published: Number(fieldValue(record, "published") || created || 1),
    stamp: created || newsStamp(record)
  };
}
async function loadPostedNewsRecords() {
  const found = [];
  const remember = (record) => {
    if (!record) return;
    const kind = String(fieldValue(record, "kind") || "").toLowerCase();
    const name = String(record.recordName || "").toLowerCase();
    if (kind !== "news" && name.indexOf("news.") !== 0) return;
    if (!(fieldValue(record, "studentName") || fieldValue(record, "titleEN"))) return;
    found.push(record);
  };
  try {
    const manifest = (await fetchByNames(cloudDb(), [NEWS_MANIFEST]))[0];
    let extra = [];
    try { extra = JSON.parse(localStorage.getItem("whsNewsIds") || "[]"); } catch (_) {}
    const ids = parsePassIDs(fieldValue(manifest, "passIDs")).concat(Array.isArray(extra) ? extra : []);
    (await fetchByNames(cloudDb(), ids)).forEach(remember);
    const iconNames = found.flatMap((record) => newsIconChunkNames(record.recordName));
    applyNewsIcons(found, await fetchByNames(cloudDb(), iconNames));
  } catch (_) {}
  return found;
}
async function loadNewsFeed() {
  const bundled = bundledNewsItems();
  const alreadyShown = window._newsItems && Object.keys(window._newsItems).length;
  if (!alreadyShown) paintNews(bundled);
  let remote = [];
  try { await ensureCloud(); } catch (_) {}
  try {
    remote = await loadPostedNewsRecords();
  } catch (_) {}
  try {
    const queried = (await restQuery(NEWS_TYPE, 100)).filter((record) => Number(fieldValue(record, "published") || 1) !== 0);
    remote = remote.concat(queried);
  } catch (_) {}
  const remoteItems = remote.map((record) => {
    if (String(fieldValue(record, "kind") || "").toLowerCase() === "news" || String(record.recordName || "").toLowerCase().indexOf("news.") === 0) {
      return newsItemFromPass(record);
    }
    return {
      id: record.recordName || "",
      image: newsImageFromRecord(record) || fieldValue(record, "image"),
      title: newsHeading(record),
      subtitle: newsBody(record),
      published: Number(fieldValue(record, "published") || 1),
      stamp: newsStamp(record)
    };
  }).filter((item) => item.id && (item.title || item.subtitle));
  const seen = new Set();
  const unique = [];
  remoteItems.concat(bundled).forEach((item) => {
    if (seen.has(item.id)) return;
    seen.add(item.id);
    unique.push(item);
  });
  unique.sort((a, b) => (b.published - a.published) || (b.stamp - a.stamp));
  paintNews(unique);
}
async function loadNews() {
  const c = t();
  document.getElementById("view-news").innerHTML = newsPage(`<div class="t">${c.newsFeed}</div>`);
  await loadNewsFeed();
}
function dataUrlToFile(dataUrl, name) {
  const parts = String(dataUrl || "").split(",");
  const raw = parts.length > 1 ? parts[1] : "";
  const binary = atob(raw);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new File([bytes], name || "news.jpg", { type: "image/jpeg" });
}
function setNewsComposeError(message) {
  const node = document.getElementById("newsComposeError");
  if (node) node.textContent = message || "";
}
function showComposeNews() {
  if (!canPostNews()) return;
  const c = t();
  window._newsDraftFile = null;
  window._pendingNewsPost = false;
  openSheet(`
    <div class="card-title"><b>${c.composeNews}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.composeNewsBody}</p>
    <div class="sheet-field"><span>${c.newsImageLabel}</span>
      <input id="newsImage" class="hidden" type="file" accept="image/*">
      <button class="ghost" type="button" data-action="pickNewsImage" style="width:100%;">${c.newsPickImage}</button>
      <img id="newsImagePreview" class="news-compose-preview hidden" alt="">
    </div>
    <label class="sheet-field"><span>${c.newsTitleLabel}</span>
      <input id="newsTitle" type="text" maxlength="120" autocomplete="off">
    </label>
    <label class="sheet-field"><span>${c.newsStoryLabel}</span>
      <textarea id="newsStory" rows="4" maxlength="800"></textarea>
    </label>
    <p class="error" id="newsComposeError"></p>
    <button class="primary" type="button" data-action="publishNews" id="newsPublishBtn">${c.newsPublish}</button>`);
}
function handleNewsImage(file) {
  if (!file) return;
  window._newsDraftFile = file;
  const preview = document.getElementById("newsImagePreview");
  if (!preview) return;
  preview.src = URL.createObjectURL(file);
  preview.classList.remove("hidden");
}
function assetFieldValue(fileDict) {
  if (!fileDict || typeof fileDict !== "object") return null;
  const src = fileDict.singleFile || fileDict;
  const value = {
    fileChecksum: src.fileChecksum,
    size: src.size,
    receipt: src.receipt,
    wrappingKey: src.wrappingKey,
    referenceChecksum: src.referenceChecksum
  };
  if (!value.fileChecksum || !value.receipt || !value.size) return null;
  return value;
}
async function ckCreateNews(record) {
  requireCloudWrite();
  const db = cloudDb();
  if (!db) return null;
  const fail = (result) => {
    if (result && result.hasErrors) {
      throw cloudRecordError(result, result.errors && result.errors[0] || result.records && result.records[0]);
    }
    const row = result && result.records && result.records[0];
    if (row && (row.serverErrorCode || row.error)) throw cloudRecordError(result, row);
    return row || result;
  };
  if (typeof db.newRecordsBatch === "function") {
    return fail(await db.newRecordsBatch().create(record).commit());
  }
  if (typeof db.saveRecords === "function") {
    return fail(await db.saveRecords([record]));
  }
  return null;
}
async function restUploadAsset(recordType, fieldName, file, recordName) {
  requireCloudWrite();
  const tokenBody = { recordType, fieldName };
  if (recordName) tokenBody.recordName = recordName;
  const response = await fetch(restPublicUrl("assets/upload"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tokens: [tokenBody] })
  });
  const payload = await response.json();
  if (payload.serverErrorCode || (payload.tokens && payload.tokens[0] && payload.tokens[0].serverErrorCode)) {
    throw cloudRecordError(payload, payload.tokens && payload.tokens[0]);
  }
  const token = (payload.tokens || [])[0];
  if (!token || !token.url) throw cloudRecordError(payload, token);
  const uploaded = await fetch(token.url, {
    method: "POST",
    body: file
  });
  const text = await uploaded.text();
  let body = {};
  try { body = JSON.parse(text); } catch (_) {
    throw Object.assign(new Error("FAIL"), { reason: "image" });
  }
  if (body.serverErrorCode) throw cloudRecordError(body, body);
  const value = assetFieldValue(body);
  if (!value) throw Object.assign(new Error("FAIL"), { reason: "image" });
  return { recordName: token.recordName || recordName, value };
}
function newsPassFields(title, story, imageValue, imageParts) {
  const fields = {
    kind: { value: "news" },
    studentName: { value: title },
    destination: { value: story },
    teacherName: { value: (profile && (profile.displayName || profile.firstName)) || "WHS" },
    dates: { value: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }
  };
  if (imageValue) fields.signature = { value: imageValue };
  if (imageParts && imageParts.length) fields.imageParts = { value: imageParts };
  return fields;
}
async function saveNewsManifest(ids, existing) {
  const record = {
    recordType: PASS_TYPE,
    recordName: NEWS_MANIFEST,
    fields: {
      kind: { value: "news" },
      passIDs: { value: (ids || []).join(",") }
    }
  };
  if (existing && existing.recordChangeTag) record.recordChangeTag = existing.recordChangeTag;
  const ops = existing ? ["forceUpdate", "update", "create"] : ["create", "forceUpdate"];
  for (const op of ops) {
    try {
      if (await createPassRecord(record, op)) return;
    } catch (_) {}
    try {
      if (await restModifySchool(record, op)) return;
    } catch (_) {}
  }
}
function rememberNewsId(id) {
  const unique = String(id || "").trim();
  if (!unique) return;
  try {
    const saved = JSON.parse(localStorage.getItem("whsNewsIds") || "[]");
    const next = [unique].concat((Array.isArray(saved) ? saved : []).filter((item) => item !== unique)).slice(0, 100);
    localStorage.setItem("whsNewsIds", JSON.stringify(next));
  } catch (_) {}
}
async function addNewsToManifest(id) {
  const unique = String(id || "").trim();
  if (!unique) return;
  let existing = null;
  try { existing = (await fetchByNames(cloudDb(), [NEWS_MANIFEST]))[0] || null; } catch (_) {}
  const ids = parsePassIDs(existing && fieldValue(existing, "passIDs"));
  if (ids.indexOf(unique) === -1) ids.unshift(unique);
  await saveNewsManifest(ids, existing);
}
async function removeNewsFromManifest(id) {
  const unique = String(id || "").trim();
  if (!unique) return;
  let existing = null;
  try { existing = (await fetchByNames(cloudDb(), [NEWS_MANIFEST]))[0] || null; } catch (_) {}
  const ids = parsePassIDs(existing && fieldValue(existing, "passIDs")).filter((item) => item !== unique);
  await saveNewsManifest(ids, existing);
}
async function publishNewsPost() {
  if (!canPostNews()) return;
  const c = t();
  const title = String((document.getElementById("newsTitle") || {}).value || "").trim();
  const story = String((document.getElementById("newsStory") || {}).value || "").trim();
  const rawFile = window._newsDraftFile;
  if (!title || !story || !rawFile) {
    setNewsComposeError(c.newsNeedFields);
    return;
  }
  const button = document.getElementById("newsPublishBtn");
  if (button) button.disabled = true;
  setNewsComposeError("");
  const renewWindow = (window._appleReady && ckWebAuthToken() && !window._appleNeedsRenew) ? null : window.open("", "whsAppleRenew", "width=640,height=720");
  window._pendingNewsPost = false;
  try {
    await ensureCloud();
    watchAppleSignIn();
    if (!(await ensureSavedStaffSession(renewWindow))) {
      window._pendingNewsPost = true;
      throw Object.assign(new Error("APPLE"), { apple: true });
    }
    const role = await requireEnrolledStaff();
    if (role !== "administrator") throw Object.assign(new Error("FAIL"), { reason: "staff" });
    const recordName = "news." + ((crypto.randomUUID && crypto.randomUUID()) || String(Date.now()));
    const draft = { recordType: PASS_TYPE, recordName, fields: newsPassFields(title, story) };
    let saved = null;
    try {
      saved = await createPassRecord(draft, "create");
    } catch (error) {
      const auth = error && (error.apple || isAuthError(error));
      if (auth) {
        window._appleReady = false;
        window._appleNeedsRenew = true;
        const again = renewWindow && !renewWindow.closed ? renewWindow : window.open("", "whsAppleRenew", "width=640,height=720");
        if (!(await renewAppleForSend(again))) throw error;
        saved = await createPassRecord(draft, "create");
      } else {
        try { saved = await restModifySchool(draft, "create"); } catch (_) { throw error; }
      }
    }
    if (!saved) {
      try {
        saved = (await fetchByNames(cloudDb(), [recordName]))[0] || null;
      } catch (_) {}
    }
    if (!saved) throw Object.assign(new Error("FAIL"), { reason: "create" });
    rememberNewsId(recordName);
    await addNewsToManifest(recordName);
    try {
      await attachNewsIcon(recordName, chunkNewsImage(await compressNewsIcon(rawFile)));
    } catch (_) {}
    window._pendingNewsPost = false;
    window._newsDraftFile = null;
    if (view === "posts") {
      const titleEl = document.getElementById("newsTitle");
      const storyEl = document.getElementById("newsStory");
      const preview = document.getElementById("newsImagePreview");
      const ok = document.getElementById("newsComposeOk");
      if (titleEl) titleEl.value = "";
      if (storyEl) storyEl.value = "";
      if (preview) {
        preview.removeAttribute("src");
        preview.classList.add("hidden");
      }
      if (ok) {
        ok.textContent = c.newsPublished;
        ok.classList.remove("hidden");
      }
      setNewsComposeError("");
      await loadNewsFeed();
    } else {
      closeSheet();
      await loadNewsFeed();
    }
  } catch (error) {
    const apple = (error && error.apple) || error.message === "APPLE" || isAuthError(error);
    setNewsComposeError(apple ? c.newsPublishNeedApple : c.newsPublishFail);
    if (!document.getElementById("newsComposeError")) {
      openSheet(`
        <div class="card-title"><b>${apple ? c.newsPublishNeedApple : c.newsPublishFail}</b><button type="button" data-action="closeSheet">${c.close}</button></div>`);
    }
  } finally {
    const again = document.getElementById("newsPublishBtn");
    if (again) again.disabled = false;
  }
}

function parsePassDate(text) {
  const raw = String(text || "").trim().replace(/[–—]/g, "-");
  if (!raw) return null;
  const start = raw.split(/\s+(?:to|through|thru|al|hasta)\s+/i)[0].split(/\s+-\s+/)[0].trim();
  const tryOne = (value) => {
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) return null;
    const date = new Date(parsed);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };
  return tryOne(start) || tryOne(raw) || (() => {
    const match = raw.match(/([A-Za-z]{3,9}\.?\s+\d{1,2}(?:,?\s+\d{2,4})?|\d{1,2}\/\d{1,2}(?:\/\d{2,4})?|\d{4}-\d{2}-\d{2})/);
    return match ? tryOne(match[1]) : null;
  })();
}
function passCreatedStamp(record) {
  const created = record && record.created;
  if (created) {
    if (typeof created.timestamp === "number") return created.timestamp;
    if (typeof created === "number") return created;
    const parsed = Date.parse(created.timestamp || created);
    if (!Number.isNaN(parsed)) return parsed;
  }
  const modified = record && record.modified;
  if (modified && typeof modified.timestamp === "number") return modified.timestamp;
  const field = record && record.fields && record.fields.createdAt;
  const raw = field && Object.prototype.hasOwnProperty.call(field, "value") ? field.value : field;
  if (typeof raw === "number") return raw;
  const fromText = Date.parse(fieldValue(record, "createdAt"));
  return Number.isNaN(fromText) ? 0 : fromText;
}
function passDayStamp(record) {
  const fromDates = parsePassDate(fieldValue(record, "dates"));
  if (fromDates) return fromDates.getTime();
  const created = passCreatedStamp(record);
  if (created) {
    const date = new Date(created);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  }
  return 0;
}
function formatPassDay(stamp) {
  if (!stamp) return t().passNoDate;
  const date = new Date(stamp);
  const loc = lang === "es" ? "es-US" : "en-US";
  let weekday = date.toLocaleDateString(loc, { weekday: "long" });
  weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  const month = date.toLocaleDateString(loc, { month: "short" }).replace(/\.$/, "") + ".";
  const day = date.getDate();
  return lang === "es" ? `${weekday} ${day} ${month}` : `${weekday} ${month} ${day}`;
}
function passSearchBlob(record) {
  const stamp = passDayStamp(record);
  const date = stamp ? new Date(stamp) : null;
  const loc = lang === "es" ? "es-US" : "en-US";
  const extras = date ? [
    formatPassDay(stamp),
    date.toLocaleDateString(loc, { weekday: "long" }),
    date.toLocaleDateString(loc, { month: "long" }),
    date.toLocaleDateString(loc, { month: "short" }),
    `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
    `${date.getMonth() + 1}/${date.getDate()}`,
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  ] : [];
  return [fieldValue(record, "studentName"), fieldValue(record, "destination"), fieldValue(record, "dates")]
    .concat(extras)
    .join(" ")
    .toLowerCase();
}
function passSlotHTML(record, order) {
  const c = t();
  const id = passRecordName(record) || String(Math.random());
  const revoked = passIsRevoked(record);
  const stamp = revoked ? `<span class="pass-revoked-stamp">${c.revoked}</span>` : "";
  const orderStyle = Number.isFinite(order) ? ` style="order:${order}"` : "";
  return `<div class="pass-slot"${orderStyle}><button type="button" class="action" data-action="openPass" data-pass-id="${escapeHtml(id)}"><span class="paper-wrap${revoked ? " is-revoked" : ""}">${passPaper(record, false)}${stamp}</span></button></div>`;
}
function passGridHTML(records) {
  const left = [];
  const right = [];
  records.forEach((record, index) => {
    const html = passSlotHTML(record, index);
    if (index % 2 === 0) left.push(html);
    else right.push(html);
  });
  return `<div class="pass-grid"><div class="pass-col">${left.join("")}</div><div class="pass-col">${right.join("")}</div></div>`;
}
function paintPassLog() {
  const node = document.getElementById("passes");
  if (!node) return;
  const c = t();
  const query = String((document.getElementById("passQuery") || {}).value || window._passQuery || "").trim().toLowerCase();
  window._passQuery = query;
  const list = (window._passLogList || []).filter((record) => !query || passSearchBlob(record).indexOf(query) !== -1);
  if (!list.length) {
    node.innerHTML = `<div class="card"><p class="muted">${(window._passLogList || []).length ? c.passSearchEmpty : c.emptyPasses}</p></div>`;
    return;
  }
  const groups = new Map();
  list.forEach((record) => {
    const stamp = passDayStamp(record);
    const key = String(stamp);
    if (!groups.has(key)) groups.set(key, { stamp, records: [] });
    groups.get(key).records.push(record);
  });
  const days = [...groups.values()].sort((a, b) => b.stamp - a.stamp);
  days.forEach((day) => {
    day.records.sort((a, b) => {
      const recency = passCreatedStamp(b) - passCreatedStamp(a);
      if (recency) return recency;
      const name = fieldValue(a, "studentName").localeCompare(fieldValue(b, "studentName"));
      if (name) return name;
      return fieldValue(a, "destination").localeCompare(fieldValue(b, "destination"));
    });
  });
  node.innerHTML = days.map((day) => (
    `<section class="pass-day"><h2 class="section">${escapeHtml(formatPassDay(day.stamp))}</h2>${passGridHTML(day.records)}</section>`
  )).join("");
}
async function loadPasses() {
  if (view !== "passes") return;
  if (window._passLoadBusy) {
    window._passLoadAgain = true;
    return;
  }
  window._passLoadBusy = true;
  const node = document.getElementById("view-passes");
  const c = t();
  const query = String((document.getElementById("passQuery") || {}).value || window._passQuery || "");
  window._passQuery = query;
  if (!document.getElementById("passes")) {
    node.innerHTML = `<div class="toolbar" style="display:flex;gap:8px;flex-wrap:wrap;">${canIssuePass() ? `<button class="ghost" type="button" data-go="issuepass">${c.issuePass}</button>` : ""}<button class="ghost" type="button" id="refreshPasses">${c.refresh}</button></div><input class="search" id="passQuery" placeholder="${c.passSearch}" value="${escapeHtml(query)}"><div id="passes"></div>`;
  }
  if (window._passLogList && window._passLogList.length) paintPassLog();
  if (!(await ensureCloud())) {
    window._passLoadBusy = false;
    if (!document.getElementById("passes")) {
      node.insertAdjacentHTML("beforeend", `<div class="card"><p class="muted">${c.adminHint}</p></div>`);
    }
    return;
  }
  const seen = new Map();
  const remember = (record) => { if (record && record.recordName) seen.set(record.recordName, record); };
  try {
    const db = CloudKit.getDefaultContainer().publicCloudDatabase;
    const campus = await readExact(CAMPUS_LOG);
    const campusReady = !!(campus && (fieldValue(campus, "kind") === "manifest" || indexIDs(campus).length));
    if (campusReady) remember(campus);
    if (!campusReady) (await fetchByNames(db, [MANIFEST])).forEach(remember);
    const legacyIDs = campusReady ? indexIDs(campus) : (seen.get(MANIFEST) ? parsePassIDs(fieldValue(seen.get(MANIFEST), "passIDs")) : []);
    const queried = (await queryStaffPassIDs(500)) || [];
    const ids = [...new Set(queried.concat(legacyIDs))].slice(0, 500);
    const hasManifest = ids.length > 0 || campusReady || !!seen.get(MANIFEST);
    if (ids.length) {
      (await fetchByNames(db, ids.concat(ids.flatMap((id) => [tombstoneName(id), revokedName(id)]), [CLEARED, CAMPUS_CLEARED]))).forEach(remember);
      const privateCleared = await readExact(CAMPUS_CLEARED);
      if (privateCleared) remember(privateCleared);
    } else if (hasManifest) {
      (await fetchByNames(db, [CLEARED, CAMPUS_CLEARED])).forEach(remember);
    }
    window._revokedPassIDs = collectRevokedIDs([...seen.values()]);
    window._clearedPassIDs = collectClearedIDs([...seen.values()]);
    const usable = [...seen.values()].filter((r) => {
      if (isPassMarker(r)) return false;
      const id = passRecordName(r).toLowerCase();
      if (window._clearedPassIDs && window._clearedPassIDs.has(id)) return false;
      return !!(fieldValue(r, "studentName") || fieldValue(r, "teacherName"));
    });
    const plainPasses = usable.filter((record) => {
      const name = String(fieldValue(record, "studentName") || "");
      return name && name.indexOf("whs1.") !== 0 && name !== "whs0.";
    });
    await applyStaffBodies(usable);
    window._passRecords = {};
    usable.forEach((record) => {
      const id = passRecordName(record);
      if (id) window._passRecords[id] = record;
    });
    window._passLogList = usable;
    if (view === "passes") paintPassLog();
    if (usable.length) auditLog("view_log", [], usable.length);
    await applyPassIcons(usable);
    await protectPlainPasses(plainPasses);
    if (view === "passes") paintPassLog();
  } catch (error) {
    if (view === "passes" && node && !document.getElementById("passes")) {
      node.insertAdjacentHTML("beforeend", `<p class="error">${escapeHtml(error.message)}</p>`);
    }
  }
  window._passLoadBusy = false;
  if (window._passLoadAgain) {
    window._passLoadAgain = false;
    loadPasses();
  }
}

function returnToCodeGate() {
  localStorage.removeItem("whsWebProfile");
  profile = null;
  applyAvatar("");
  showGate();
}

async function enterWithCode() {
  gateError.textContent = "";
  const key = normalizeCode(webCode.value);
  if (key.length < 8) {
    gateError.textContent = t().gateFail;
    return;
  }
  if (!schoolToken()) {
    gateError.textContent = t().gateFail;
    return;
  }
  try { await ensureCloud({ skipAuth: true }); } catch (_) {}
  try {
    let db = null;
    try { db = CloudKit.getDefaultContainer().publicCloudDatabase; } catch (_) {}
    const records = await fetchByNames(db, [key]);
    const record = records.find((item) => codeNames(item.recordName).includes(key));
    if (!record) {
      gateError.textContent = t().gateFail;
      return;
    }
    const role = normalizeRole(fieldValue(record, "role"));
    if (!role) {
      gateError.textContent = t().gateFail;
      return;
    }
    const secrets = await profileSecrets(record, key);
    profile = {
      displayName: fieldValue(record, "displayName") || fieldValue(record, "firstName") || "Warrior",
      firstName: fieldValue(record, "firstName") || "",
      role,
      grade: secrets.grade || "",
      key
    };
    localStorage.setItem("whsWebProfile", JSON.stringify(profile));
    applyAvatar(secrets.photo);
    showGate();
    show("home");
  } catch (error) {
    gateError.textContent = error.message || t().gateFail;
  }
}

fetch("./staff.json").then((res) => res.json()).then((data) => {
  staff = data;
  if (view === "contacts") renderStaff("");
}).catch(() => {});

document.body.addEventListener("click", (event) => {
  const mail = event.target.closest("[data-mail]");
  if (mail && mail.dataset.mail) {
    window.location.href = mail.dataset.mail;
    return;
  }
  const action = event.target.closest("[data-action]");
  if (action) {
    const name = action.dataset.action;
    if (name === "copyStaffId") {
      const id = (document.getElementById("staffCloudId") || {}).textContent || window._ckUserRecordName || "";
      if (id && navigator.clipboard) navigator.clipboard.writeText(id).catch(() => {});
      return;
    }
    if (name === "guestSetup") {
      showGuestStep();
      return;
    }
    if (name === "swipe") show("swipe");
    if (name === "passesInfo") openPassesInfo();
    if (name === "ask") openAsk("");
    if (name === "aide") openAide();
    if (name === "askGo") answerAsk(document.getElementById("askBox") && document.getElementById("askBox").value);
    if (name === "closeSheet") closeSheet();
    if (name === "openNewsItem") {
      const item = window._newsItems && window._newsItems[action.dataset.newsId || ""];
      if (item) {
        openSheet(`
          <div class="card-title"><b>${escapeHtml(item.title)}</b><button type="button" data-action="closeSheet">${t().close}</button></div>
          ${item.image ? `<img class="news-full" alt="" src="${escapeHtml(item.image)}">` : ""}
          <p class="muted">${escapeHtml(item.subtitle)}</p>`);
      }
    }
    if (name === "composeNews") show("posts");
    if (name === "askDeleteNews") confirmDeleteNews(action.dataset.newsId || "");
    if (name === "deleteNews") deleteNewsPost(action.dataset.newsId || "");
    if (name === "pickNewsImage") {
      const picker = document.getElementById("newsImage");
      if (picker) picker.click();
    }
    if (name === "publishNews") publishNewsPost();
    if (name === "passKind") {
      window._issuePassKind = action.dataset.kind === "hallway" ? "hallway" : "flex";
      document.querySelectorAll("[data-action='passKind']").forEach((node) => {
        node.classList.toggle("on", node.dataset.kind === window._issuePassKind);
      });
    }
    if (name === "clearPassSig") {
      bindPassSignaturePad();
    }
    if (name === "issuePass") issuePassFromWeb();
    if (name === "useCode") returnToCodeGate();
    if (name === "toggleWebCode") setWebCodeShown(!window._webCodeShown);
    if (name === "auditMore") loadAuditLog(false);
    if (name === "auditRefresh") loadAuditLog(true);
    if (name === "askResetWebCode") askResetWebCode();
    if (name === "confirmResetWebCode") resetWebCode();
    if (name === "copyWebCode") {
      const formatted = formatWebKey(profile && profile.key);
      const button = document.getElementById("copyWebCode");
      const done = () => {
        if (button) button.textContent = t().webCodeCopied;
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(formatted).then(done).catch(done);
      } else {
        done();
      }
    }
    if (name === "pickSwipe") {
      const picker = document.getElementById("swipeFile");
      if (picker) picker.click();
    }
    if (name === "removeProfile") removeChromebookProfile();
    if (name === "addHome") showAddHome();
    if (name === "installHome") promptInstallHome();
    if (name === "openPass" || name === "openStudentPass") openPass(action.dataset.passId || "");
    if (name === "askRevokePass") confirmRevokePass(action.dataset.passId || "");
    if (name === "revokePass") handleRevokePass(action.dataset.passId || "");
    if (name === "askClearPassLog") confirmClearPassLog();
    if (name === "clearPassLog") handleClearPassLog();
    if (name === "finishPassWipe") finishPassWipe();
    if (name === "finishIssuePass") finishIssuePass();
    if (name === "openClass") {
      window._classID = action.dataset.classId || "";
      show("class");
    }
    if (name === "addClass") showClassEditor(null);
    if (name === "editClass") showClassEditor(classById(action.dataset.classId || ""));
    if (name === "saveClass") saveClassFromSheet();
    if (name === "askDeleteClass") confirmDeleteClass(action.dataset.classId || "");
    if (name === "deleteClass") deleteGuestClass(action.dataset.classId || "");
    if (name === "openResource") openResource(action.dataset.classId || "", action.dataset.resource || "");
    if (name === "openReadySet") startLearnQuiz(action.dataset.set || "");
    if (name === "qlClose") {
      window._studyMode = { type: "readySets" };
      renderStudy();
    }
    if (name === "qlPick") {
      const ql = window._ql;
      if (ql && !ql.revealed && !ql.finished) {
        ql.selected = action.dataset.pick || "";
        ql.revealed = true;
        if (ql.selected === (ql.deck[ql.index] && ql.deck[ql.index].answer)) ql.correct += 1;
        renderStudy();
      }
    }
    if (name === "qlContinue") {
      const ql = window._ql;
      if (ql) {
        if (ql.index + 1 >= ql.deck.length) ql.finished = true;
        else {
          ql.index += 1;
          ql.selected = "";
          ql.revealed = false;
          loadLearnOptions();
        }
        renderStudy();
      }
    }
    if (name === "qlAgain") startLearnQuiz((window._ql && window._ql.setId) || "");
    if (name === "openList") {
      window._studyPairs = pairsFromList(action.dataset.kind || "spanish", action.dataset.folder || "", action.dataset.list || "");
      window._cardIndex = 0;
      window._cardFlip = false;
      window._quiz = null;
      window._studyMode = action.dataset.kind === "englishQuiz" ? { type: "quiz" } : { type: "cards" };
      if (window._studyMode.type === "quiz") startQuiz(window._studyPairs.filter((pair) => pair.back));
      show("study");
      renderStudy();
    }
    if (name === "openFile") {
      window._studyMode = { type: "file", file: action.dataset.file, kind: action.dataset.kind, title: action.dataset.title };
      show("study");
      renderStudy();
    }
    if (name === "flipCard") {
      window._cardFlip = !window._cardFlip;
      renderStudy();
    }
    if (name === "nextCard") {
      window._cardIndex = (window._cardIndex || 0) + 1;
      if (window._cardIndex >= (window._studyPairs || []).length) window._cardIndex = 0;
      window._cardFlip = false;
      renderStudy();
    }
    if (name === "prevCard") {
      window._cardIndex = (window._cardIndex || 0) - 1;
      if (window._cardIndex < 0) window._cardIndex = Math.max(0, (window._studyPairs || []).length - 1);
      window._cardFlip = false;
      renderStudy();
    }
    if (name === "startQuiz") {
      window._studyMode = { type: "quiz" };
      startQuiz((window._studyPairs || []).filter((pair) => pair.back));
      renderStudy();
    }
    if (name === "quizPick") {
      const quiz = window._quiz;
      if (quiz && quiz.order[quiz.index]) {
        const pick = Number(action.dataset.pick);
        const choices = quiz.choices[quiz.index] || [];
        if (choices[pick] === quiz.order[quiz.index].back) quiz.correct += 1;
        quiz.index += 1;
        renderStudy();
      }
    }
  }
  const go = event.target.closest("[data-go]");
  if (go) show(go.dataset.go);
  const tab = event.target.closest("button[data-view]");
  if (tab) show(tab.dataset.view);
  if (event.target.id === "en") { lang = "en"; localStorage.setItem("whsAdminLang", lang); show(view); }
  if (event.target.id === "es") { lang = "es"; localStorage.setItem("whsAdminLang", lang); show(view); }
  if (event.target.id === "signOutProfile" || event.target.closest("#signOutProfile")) {
    confirmRemoveProfile();
  }
  if (event.target.id === "saveToken") {
    localStorage.setItem("whsAdminToken", document.getElementById("token").value.trim());
    localStorage.setItem("whsAdminEnv", document.getElementById("env").value);
    configured = false;
    const note = document.getElementById("tokenSaved");
    if (note) { note.textContent = t().tokenSaved; note.classList.remove("hidden"); }
  }
  if (event.target.id === "openPasses") show("passes");
  if (event.target.id === "refreshPasses") loadPasses();
  if (event.target.closest("#bell")) show("news");
  if (event.target.closest("#me")) show("more");
  if (event.target.id === "skipSite" || event.target.closest("#skipSite")) showGuestStep();
  if (event.target.id === "guestFinish" || event.target.closest("#guestFinish")) enterGuest();
  if (event.target.id === "enterSite" || event.target.closest("#enterSite")) enterWithCode();
});
document.body.addEventListener("input", (event) => {
  if (event.target.id === "staffQuery") renderStaff(event.target.value);
  if (event.target.id === "passQuery") paintPassLog();
  if (event.target.id === "auditQuery") paintAuditLog();
});
document.body.addEventListener("change", (event) => {
  if (event.target.id === "guestRole") {
    const err = document.getElementById("setupError");
    if (err) err.textContent = "";
    syncGuestRoleFields();
  }
  if (event.target.id === "swipeFile" && event.target.files && event.target.files[0]) {
    handleSwipeFile(event.target.files[0]);
    event.target.value = "";
  }
  if (event.target.id === "newsImage" && event.target.files && event.target.files[0]) {
    handleNewsImage(event.target.files[0]);
    event.target.value = "";
  }
});
document.body.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.id === "askBox") {
    event.preventDefault();
    answerAsk(event.target.value);
  }
  if (event.key === "Enter" && event.target.id === "webCode") {
    event.preventDefault();
    enterWithCode();
  }
  if (event.key === "Enter" && (event.target.id === "guestName" || event.target.id === "guestGrade" || event.target.id === "guestAccess")) {
    event.preventDefault();
    enterGuest();
  }
  if (event.key === "Escape") closeSheet();
});
sheet.addEventListener("click", (event) => {
  if (event.target === sheet) closeSheet();
});
function showPairStep() {
  window._gateStep = "pair";
  window._pendingGuestStaff = null;
  document.body.classList.remove("whs-apple-gate");
  document.getElementById("gatePair").classList.remove("hidden");
  document.getElementById("gateSetup").classList.add("hidden");
  const apple = document.getElementById("gateApple");
  if (apple) apple.classList.add("hidden");
  parkCkAuth();
  const err = document.getElementById("setupError");
  if (err) err.textContent = "";
  const appleErr = document.getElementById("appleError");
  if (appleErr) appleErr.textContent = "";
}
function showGuestStep() {
  window._gateStep = "guest";
  document.getElementById("gatePair").classList.add("hidden");
  document.getElementById("gateSetup").classList.remove("hidden");
  const apple = document.getElementById("gateApple");
  if (apple) apple.classList.add("hidden");
  const access = document.getElementById("guestAccess");
  if (access) access.value = "";
  applyChrome();
  const name = document.getElementById("guestName");
  if (name) name.focus();
}
function syncGuestRoleFields() {
  const role = normalizeRole((document.getElementById("guestRole") || {}).value);
  const staff = role === "teacher" || role === "administrator";
  const gradeRow = document.getElementById("guestGradeRow");
  const accessRow = document.getElementById("guestAccessRow");
  if (gradeRow) gradeRow.classList.toggle("hidden", staff);
  if (accessRow) accessRow.classList.add("hidden");
}
function pendingStaffFromForm() {
  if (!((window._gateStep === "guest" || window._gateStep === "apple") && gateIsOpen())) return null;
  const name = String((document.getElementById("guestName") || {}).value || "").trim();
  const role = normalizeRole((document.getElementById("guestRole") || {}).value);
  if ((role !== "teacher" && role !== "administrator") || !name) return null;
  return { name, role };
}
async function enterGuest() {
  const name = String((document.getElementById("guestName") || {}).value || "").trim();
  const role = normalizeRole((document.getElementById("guestRole") || {}).value);
  const grade = String((document.getElementById("guestGrade") || {}).value || "").trim();
  const err = document.getElementById("setupError");
  const staff = role === "teacher" || role === "administrator";
  if (!name) {
    if (err) err.textContent = t().guestNeedInfo;
    return;
  }
  if (role !== "student" && role !== "teacher" && role !== "administrator") {
    if (err) err.textContent = t().guestNeedRole;
    return;
  }
  if (role === "student" && !grade) {
    if (err) err.textContent = t().guestNeedInfo;
    return;
  }
  if (err) err.textContent = "";
  const finish = document.getElementById("guestFinish");
  if (staff) {
    window._pendingGuestStaff = { name, role };
    await showAppleStep();
    return;
  } else {
    if (finish) finish.disabled = true;
    const savedKey = await allocateGuestStudentKey({ displayName: name, firstName: name, grade });
    const key = savedKey || makeWebUnlockKey();
    if (finish) finish.disabled = false;
    profile = { displayName: name, firstName: name, role: "student", grade, key, guest: true, cloudSaved: !!savedKey, classes: [] };
  }
  localStorage.setItem("whsWebProfile", JSON.stringify(profile));
  applyAvatar("");
  showGate();
  show("home");
}
async function finishPendingGuestStaff() {
  const pending = window._pendingGuestStaff;
  const err = document.getElementById("appleError") || document.getElementById("setupError");
  if (!pending) return;
  if (!ckWebAuthToken()) {
    if (err) err.textContent = t().appleStepBody;
    return;
  }
  if (err) err.textContent = "";
  const looked = await fetchStaffRole();
  let appleUser = window._ckUserRecordName || "";
  if (!appleUser) {
    try { appleUser = await ckUserRecordName(); } catch (_) { appleUser = ""; }
  }
  if (looked.state === "error") {
    if (err) err.textContent = t().staffRoleRetry;
    return;
  }
  if (looked.state !== "staff") {
    window._verifiedStaffRole = "";
    if (err) err.textContent = t().staffNotListed + (appleUser ? " " + appleUser : "");
    return;
  }
  window._verifiedStaffRole = looked.role;
  window._pendingGuestStaff = null;
  document.body.classList.remove("whs-apple-gate");
  window._gateStep = "pair";
  parkCkAuth();
  profile = {
    displayName: pending.name,
    firstName: pending.name,
    role: looked.role,
    key: "",
    guest: true,
    appleUser
  };
  localStorage.setItem("whsWebProfile", JSON.stringify(profile));
  applyAvatar("");
  showGate();
  show("home");
}
window.show = show;
window.openAsk = openAsk;
window.openAide = openAide;
window.openPassesInfo = openPassesInfo;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
showGate();
if (signedIn()) {
  show("home");
  if (currentRole() === "teacher" || currentRole() === "administrator") {
    restoreStaffCloudSession().then(() => {
      keepAppleSessionFresh();
      return syncStaffRoleFromCloud();
    }).catch(() => keepAppleSessionFresh());
  }
}
document.addEventListener("visibilitychange", () => {
  // Hide the web code again when the student switches away from this tab or app.
  if (document.visibilityState !== "visible") {
    if (window._webCodeShown) setWebCodeShown(false);
    return;
  }
  syncStaffRoleFromCloud().catch(() => {});
});
setInterval(() => {
  syncStaffRoleFromCloud().catch(() => {});
}, 30000);
