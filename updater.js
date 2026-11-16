const fs = require('fs');
const path = 'c:\\\\Users\\\\heria\\\\Downloads\\\\Escritorio\\\\ANTIGRAVITY\\\\curso ia mayo\\\\Modulo 1 Fundamentos IA\\\\index.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Move LLM and Specific IA to the end (before conclusion)
const llmPart = html.match(/<section id="llms-asistentes"[\s\S]*?<\/section>\s*/);
const iasPart = html.match(/<section id="ias-especificas"[\s\S]*?<\/section>\s*/);

if (llmPart && iasPart) {
    html = html.replace(llmPart[0], '');
    html = html.replace(iasPart[0], '');
    html = html.replace(/<section id="conclusion"/, llmPart[0] + iasPart[0] + '<section id="conclusion"');
}

// 2. Add DUA CSS
const newCss = `
        /* DUA Styles */
        .dua-contrast { background-color: #121212 !important; color: #e5e7eb !important; }
        .dua-contrast .card-pro, .dua-contrast section, .dua-contrast aside div { background-color: #1a1a1a !important; border-color: #333 !important; }
        .dua-contrast h1, .dua-contrast h2, .dua-contrast h3, .dua-contrast h4, .dua-contrast p, .dua-contrast a, .dua-contrast strong, .dua-contrast span { color: #f3f4f6 !important; }
        .dua-contrast .bg-slate-50, .dua-contrast .bg-white { background-color: #1a1a1a !important; }
        
        .dua-dyslexia * { font-family: 'Comic Sans MS', 'OpenDyslexic', sans-serif !important; letter-spacing: 0.1em !important; word-spacing: 0.25em !important; }
        .dua-textsize h2 { font-size: 3rem !important; }
        .dua-textsize h3 { font-size: 2.2rem !important; }
        .dua-textsize p, .dua-textsize li { font-size: 1.35rem !important; line-height: 2 !important; }
        
        details summary::-webkit-details-marker { display: none; }
        details summary { outline: none; list-style: none; cursor: pointer; }
        details { transition: all 0.3s ease; }
    </style>
`;
html = html.replace('</style>', newCss);

// 3. Convert specific sections into Hover & Click Collapsibles (Accordions)
// Automatizacion
const autoListStr = `<ul class="space-y-6 text-lg text-slate-700 font-medium">`;
const newAutoList = `
    <div class="space-y-4">
        <details class="bg-slate-50 rounded-2xl p-6 border border-slate-200 group hover:shadow-lg transition duration-300 open:bg-white open:shadow-xl">
            <summary class="text-xl font-bold text-slate-800 flex items-center justify-between"><span class="flex items-center"><i class="fas fa-check text-green-600 mr-4 text-2xl"></i> Calificación y Feedback Inicial</span><i class="fas fa-chevron-down group-open:rotate-180 transition-transform text-slate-400"></i></summary>
            <div class="mt-6 pt-6 border-t border-slate-100 text-lg text-slate-600 font-light leading-relaxed">Corrección automática de pruebas objetivas y primer borrador de feedback para tareas escritas, permitiendo ahorrar horas de revisión manual.</div>
        </details>
        <details class="bg-slate-50 rounded-2xl p-6 border border-slate-200 group hover:shadow-lg transition duration-300 open:bg-white open:shadow-xl">
            <summary class="text-xl font-bold text-slate-800 flex items-center justify-between"><span class="flex items-center"><i class="fas fa-paint-brush text-purple-600 mr-4 text-2xl"></i> Generación de Materiales</span><i class="fas fa-chevron-down group-open:rotate-180 transition-transform text-slate-400"></i></summary>
            <div class="mt-6 pt-6 border-t border-slate-100 text-lg text-slate-600 font-light leading-relaxed">Creación de borradores de lecciones, resúmenes, bancos de preguntas y presentaciones interactivas de una forma ágil.</div>
        </details>
        <details class="bg-slate-50 rounded-2xl p-6 border border-slate-200 group hover:shadow-lg transition duration-300 open:bg-white open:shadow-xl">
            <summary class="text-xl font-bold text-slate-800 flex items-center justify-between"><span class="flex items-center"><i class="fas fa-calendar-alt text-orange-600 mr-4 text-2xl"></i> Gestión Administrativa</span><i class="fas fa-chevron-down group-open:rotate-180 transition-transform text-slate-400"></i></summary>
            <div class="mt-6 pt-6 border-t border-slate-100 text-lg text-slate-600 font-light leading-relaxed">Programación de tutorías, recordatorios automáticos y seguimiento de asistencia integrada al LMS.</div>
        </details>
    </div>
`;
html = html.replace(/<ul class="space-y-6 text-lg text-slate-700 font-medium">[\s\S]*?<\/ul>/, newAutoList);

// Roles
const rolesMatch = html.match(/<div class="grid md:grid-cols-2 gap-8">[\s\S]*?<div class="flex items-start">[\s\S]*?<div class="bg-orange-100[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
if (rolesMatch) {
    const newRoles = `
        <div class="space-y-6">
            <details class="bg-teal-50 rounded-2xl p-6 border border-teal-100 group hover:shadow-lg transition duration-300 open:bg-white open:shadow-2xl">
                <summary class="text-xl font-bold text-slate-800 flex items-center justify-between"><span class="flex items-center"><div class="bg-teal-100 text-teal-600 p-4 rounded-xl mr-4 shadow-sm"><i class="fas fa-drafting-compass text-2xl"></i></div> Diseñador/a de Experiencias</span><i class="fas fa-chevron-down group-open:rotate-180 transition-transform text-slate-400"></i></summary>
                <div class="mt-6 pt-6 border-t border-slate-100 text-xl text-slate-600 font-light leading-relaxed">Crea itinerarios formativos personalizados, integrando herramientas IA y metodologías activas para que el aprendizaje sea inolvidable.</div>
            </details>
            <details class="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 group hover:shadow-lg transition duration-300 open:bg-white open:shadow-2xl">
                <summary class="text-xl font-bold text-slate-800 flex items-center justify-between"><span class="flex items-center"><div class="bg-indigo-100 text-indigo-600 p-4 rounded-xl mr-4 shadow-sm"><i class="fas fa-heart text-2xl"></i></div> Facilitador/a y Mentor/a</span><i class="fas fa-chevron-down group-open:rotate-180 transition-transform text-slate-400"></i></summary>
                <div class="mt-6 pt-6 border-t border-slate-100 text-xl text-slate-600 font-light leading-relaxed">Guía el proceso de aprendizaje, fomenta el pensamiento crítico y ofrece apoyo socioemocional a lo largo de su jornada académica.</div>
            </details>
            <details class="bg-rose-50 rounded-2xl p-6 border border-rose-100 group hover:shadow-lg transition duration-300 open:bg-white open:shadow-2xl">
                <summary class="text-xl font-bold text-slate-800 flex items-center justify-between"><span class="flex items-center"><div class="bg-rose-100 text-rose-600 p-4 rounded-xl mr-4 shadow-sm"><i class="fas fa-shield-alt text-2xl"></i></div> Experto/a en Ética</span><i class="fas fa-chevron-down group-open:rotate-180 transition-transform text-slate-400"></i></summary>
                <div class="mt-6 pt-6 border-t border-slate-100 text-xl text-slate-600 font-light leading-relaxed">Promueve el uso responsable de la IA, privacidad de datos y evita una injusta equidad algorítmica asegurando un internet seguro.</div>
            </details>
            <details class="bg-orange-50 rounded-2xl p-6 border border-orange-100 group hover:shadow-lg transition duration-300 open:bg-white open:shadow-2xl">
                <summary class="text-xl font-bold text-slate-800 flex items-center justify-between"><span class="flex items-center"><div class="bg-orange-100 text-orange-600 p-4 rounded-xl mr-4 shadow-sm"><i class="fas fa-laptop-code text-2xl"></i></div> Curioso/a Digital</span><i class="fas fa-chevron-down group-open:rotate-180 transition-transform text-slate-400"></i></summary>
                <div class="mt-6 pt-6 border-t border-slate-100 text-xl text-slate-600 font-light leading-relaxed">Explora e integra de forma continua nuevas herramientas en los entornos digitales para enriquecer el aula.</div>
            </details>
        </div>
    `;
    html = html.replace(rolesMatch[0], newRoles);
}

// 4. Inject DUA Floating Menu before </body>
const duaMenuHtml = `
    <!-- Accesibilidad DUA Flotante -->
    <div class="fixed bottom-8 right-8 z-[100]">
        <button id="dua-btn" class="bg-indigo-600 text-white p-5 rounded-full shadow-[0_10px_40px_rgba(79,70,229,0.5)] hover:bg-indigo-700 transition transform hover:scale-110" title="Diseño Universal para el Aprendizaje">
            <i class="fas fa-universal-access text-3xl"></i>
        </button>
        <div id="dua-menu" class="hidden absolute bottom-20 right-0 bg-white p-6 rounded-3xl shadow-[0_15px_60px_rgba(0,0,0,0.15)] border border-slate-100 w-80 transition-all font-sans">
            <h4 class="text-slate-800 font-bold mb-6 flex items-center border-b border-slate-100 pb-4 text-xl"><i class="fas fa-eye mr-3 text-indigo-500"></i> Opciones DUA</h4>
            <div class="space-y-5">
                <label class="flex items-center space-x-4 cursor-pointer group">
                    <input type="checkbox" id="dua-contrast" class="form-checkbox h-6 w-6 text-indigo-600 rounded-md border-slate-300">
                    <span class="text-slate-700 font-medium group-hover:text-indigo-600 text-lg">Alto Contraste</span>
                </label>
                <label class="flex items-center space-x-4 cursor-pointer group">
                    <input type="checkbox" id="dua-dyslexia" class="form-checkbox h-6 w-6 text-indigo-600 rounded-md border-slate-300">
                    <span class="text-slate-700 font-medium group-hover:text-indigo-600 text-lg">Fuente Dislexia</span>
                </label>
                <label class="flex items-center space-x-4 cursor-pointer group">
                    <input type="checkbox" id="dua-textsize" class="form-checkbox h-6 w-6 text-indigo-600 rounded-md border-slate-300">
                    <span class="text-slate-700 font-medium group-hover:text-indigo-600 text-lg">Texto Aumentado</span>
                </label>
            </div>
            <p class="text-xs text-slate-400 mt-6 pt-4 border-t border-slate-100">Configuración adaptativa para lectura sin barreras.</p>
        </div>
    </div>
    
    <script>
        document.getElementById('dua-btn').addEventListener('click', () => {
             document.getElementById('dua-menu').classList.toggle('hidden');
        });
        document.getElementById('dua-contrast').addEventListener('change', (e) => {
             document.body.classList.toggle('dua-contrast', e.target.checked);
        });
        document.getElementById('dua-dyslexia').addEventListener('change', (e) => {
             document.body.classList.toggle('dua-dyslexia', e.target.checked);
        });
        document.getElementById('dua-textsize').addEventListener('change', (e) => {
             document.body.classList.toggle('dua-textsize', e.target.checked);
        });
    </script>
`;
html = html.replace('</body>', duaMenuHtml + '\n</body>');

// Reorder Sidebar correctly
const newSidebar = `
                <nav id="main-nav" class="flex flex-col gap-2">
                    <a href="#presentacion_genially" class="nav-link flex items-center p-3 rounded-xl font-medium"><i class="fas fa-file-powerpoint w-8 text-center text-slate-400"></i> Genially Interactivo</a>
                    <a href="#introduccion" class="nav-link flex items-center p-3 rounded-xl font-medium"><i class="fas fa-rocket w-8 text-center text-slate-400"></i> 1. Introducción</a>
                    <a href="#posibilidades-ia" class="nav-link flex items-center p-3 rounded-xl font-medium"><i class="fas fa-sparkles w-8 text-center text-slate-400"></i> 2. Posibilidades IA</a>
                    <a href="#automatizacion" class="nav-link flex items-center p-3 rounded-xl font-medium"><i class="fas fa-check-circle w-8 text-center text-slate-400"></i> 3. Automatización</a>
                    <a href="#desafios" class="nav-link flex items-center p-3 rounded-xl font-medium"><i class="fas fa-lightbulb w-8 text-center text-slate-400"></i> 4. Desafíos y Ética</a>
                    <a href="#rol-docente" class="nav-link flex items-center p-3 rounded-xl font-medium"><i class="fas fa-chalkboard-teacher w-8 text-center text-slate-400"></i> 5. Nuevo Rol Docente</a>
                    <a href="#habilidades" class="nav-link flex items-center p-3 rounded-xl font-medium"><i class="fas fa-brain w-8 text-center text-slate-400"></i> 6. Habilidades del Futuro</a>
                    <a href="#evaluacion-2026" class="nav-link flex items-center p-3 rounded-xl font-medium"><i class="fas fa-gavel w-8 text-center text-slate-400"></i> 7. Revolución Evaluativa</a>
                    <a href="#llms-asistentes" class="nav-link flex items-center p-3 rounded-xl font-medium"><i class="fas fa-robot w-8 text-center text-slate-400"></i> 8. LLMs y Herramientas</a>
                    <a href="#ias-especificas" class="nav-link flex items-center p-3 rounded-xl font-medium"><i class="fas fa-palette w-8 text-center text-slate-400"></i> 9. IAs Multimedia</a>
                    <a href="#conclusion" class="nav-link flex items-center p-3 rounded-xl font-medium"><i class="fas fa-flag-checkered w-8 text-center text-slate-400"></i> 10. Conclusión</a>
                    <a href="#quiz-ia" class="nav-link flex items-center p-3 rounded-xl font-medium text-orange-doc"><i class="fas fa-question-circle w-8 text-center text-orange-doc"></i> Quiz Final</a>
                </nav>
`;
html = html.replace(/<nav id="main-nav" class="flex flex-col gap-2">[\s\S]*?<\/nav>/, newSidebar);

fs.writeFileSync(path, html, 'utf8');
console.log('Successfully updated HTML');
