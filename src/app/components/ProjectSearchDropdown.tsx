import React from 'react';

interface Project {
  id: string;
  nr: string;
  ekstNr: string;
  navn: string;
  kategori: string;
  adresse: string;
  postnr: string;
  sted: string;
  utlopsdato: string;
}

interface ProjectSearchDropdownProps {
  show: boolean;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  topPosition?: string; // CSS top position value (e.g., "100px", "200px")
}

/**
 * ProjectSearchDropdown - Consolidated dropdown component for project search results
 * 
 * Used consistently across ALL ERP scenarios (Nexstep, Trygg2000, Aspect4, AX, IFS, etc.)
 * 
 * Features:
 * - No scrollbars (uses overflow-hidden)
 * - Positioned absolutely with full Figma width (871px)
 * - High z-index (z-100) to overlay all content including footer and right section
 * - Uses design system CSS variables for all styling
 * - Matches Figma design with clean table layout
 */
export function ProjectSearchDropdown({ show, projects, onSelectProject, topPosition = '0px' }: ProjectSearchDropdownProps) {
  if (!show || projects.length === 0) {
    return null;
  }

  return (
    <div 
      className="absolute left-0 bg-white rounded-[3px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] w-[871px] z-[100] overflow-hidden"
      style={{ top: topPosition }}
    >
      <div aria-hidden="true" className="absolute border border-[#e6e6e8] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="relative">
        {/* Table Header */}
        <div className="flex gap-[10px] px-[12px] py-[13px]">
          <p className="font-['Montserrat',sans-serif] font-[var(--font-weight-bold)] leading-[1.75] text-[#6b6b72] text-[var(--text-sm)] tracking-[0.5px] uppercase w-[56px]">NR</p>
          <p className="font-['Montserrat',sans-serif] font-[var(--font-weight-bold)] leading-[1.75] text-[#6b6b72] text-[var(--text-sm)] tracking-[0.5px] uppercase w-[224px]">NAVN</p>
          <p className="font-['Montserrat',sans-serif] font-[var(--font-weight-bold)] leading-[1.75] text-[#6b6b72] text-[var(--text-sm)] tracking-[0.5px] uppercase w-[151px]">KATEGORI</p>
          <p className="font-['Montserrat',sans-serif] font-[var(--font-weight-bold)] leading-[1.75] text-[#6b6b72] text-[var(--text-sm)] tracking-[0.5px] uppercase w-[182px]">ADRESSE</p>
          <p className="font-['Montserrat',sans-serif] font-[var(--font-weight-bold)] leading-[1.75] text-[#6b6b72] text-[var(--text-sm)] tracking-[0.5px] uppercase flex-1">POSTNR, STED</p>
        </div>
        
        {/* Header divider */}
        <div className="h-0 relative">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 871 1">
              <line stroke="#E6E6E8" x2="871" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>

        {/* Table Rows */}
        <div>
          {projects.map((project, index) => (
            <div key={project.id}>
              <button
                onMouseDown={() => onSelectProject(project)}
                className="flex gap-[10px] px-[12px] py-[13px] w-full text-left transition-colors bg-white hover:bg-[#f5f5f7] cursor-pointer border-none"
              >
                <p className="font-['Montserrat',sans-serif] font-[var(--font-weight-normal)] leading-[1.38] text-[#090914] text-[var(--text-base)] w-[56px] whitespace-nowrap overflow-hidden text-ellipsis">{project.nr}</p>
                <p className="font-['Montserrat',sans-serif] font-[var(--font-weight-normal)] leading-[1.38] text-[#090914] text-[var(--text-base)] w-[224px] whitespace-nowrap overflow-hidden text-ellipsis">{project.navn}</p>
                <p className="font-['Montserrat',sans-serif] font-[var(--font-weight-normal)] leading-[1.38] text-[#090914] text-[var(--text-base)] w-[151px] whitespace-nowrap overflow-hidden text-ellipsis">{project.kategori}</p>
                <p className="font-['Montserrat',sans-serif] font-[var(--font-weight-normal)] leading-[1.38] text-[#090914] text-[var(--text-base)] w-[182px] whitespace-nowrap overflow-hidden text-ellipsis">{project.adresse}</p>
                <p className="font-['Montserrat',sans-serif] font-[var(--font-weight-normal)] leading-[1.38] text-[#090914] text-[var(--text-base)] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{project.postnr}, {project.sted}</p>
              </button>
              
              {index < projects.length - 1 && (
                <div className="h-0 relative">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 871 1">
                      <line stroke="#E6E6E8" x2="871" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}