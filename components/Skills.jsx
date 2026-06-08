'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const skillsData = [
  { name: 'HTML5',      category: 'Frontend', color: '#E34F26', bg: 'rgba(227,79,38,0.15)',   floatDur: 4.0, svg: '<svg viewBox="0 0 24 24" fill="#E34F26"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>' },
  { name: 'CSS3',       category: 'Frontend', color: '#1572B6', bg: 'rgba(21,114,182,0.15)',  floatDur: 4.5, svg: '<svg viewBox="0 0 24 24" fill="#1572B6"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414v-.001z"/></svg>' },
  { name: 'JavaScript', category: 'Frontend', color: '#F7DF1E', bg: 'rgba(247,223,30,0.15)',  floatDur: 5.0, svg: '<svg viewBox="0 0 24 24" fill="#F7DF1E"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.81-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>' },
  { name: 'Tailwind',   category: 'Frontend', color: '#06B6D4', bg: 'rgba(6,182,212,0.15)',   floatDur: 4.2, svg: '<svg viewBox="0 0 24 24" fill="#06B6D4"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>' },
  { name: 'React',      category: 'Frontend', color: '#61DAFB', bg: 'rgba(97,218,251,0.15)',  floatDur: 4.8, svg: '<svg viewBox="0 0 24 24" fill="#61DAFB"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.375-.498-1.732-.74-2.852-1.708-2.852-2.476.005-.768 1.125-1.74 2.857-2.475.42-.18.88-.342 1.356-.495zm11.33 4.784c.235.396.473.787.697 1.187.224.39.434.78.635 1.174-.64.15-1.315.283-2.015.386.24-.378.48-.762.705-1.16.225-.39.435-.782.637-1.178l-.659.392zm-11.26.006c.2.392.41.783.64 1.175.23.39.468.775.705 1.15-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933l.001-.006zm3.063 2.497c.495.158 1.02.286 1.57.38-.287.376-.576.73-.865 1.054-.34-.367-.675-.76-1.005-1.178l.3-.256zm6.24 0l-.3.256c-.33.418-.665.81-1.005 1.178-.287-.322-.577-.678-.864-1.054.55-.094 1.075-.222 1.57-.38zm-4.944.913c.34.346.68.656 1.02.943-.34-.29-.68-.6-1.02-.943zm3.653.037c-.35.354-.7.67-1.05.966.35-.3.7-.614 1.05-.966z"/></svg>' },
  { name: 'Next.js',    category: 'Frontend', color: '#ffffff', bg: 'rgba(255,255,255,0.08)', floatDur: 5.2, svg: '<svg viewBox="0 0 24 24" fill="#ffffff"><path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474.0019.9474.0123 1.0958.1083 1.7886.6719 4.7191 3.9377 8.6263 8.4636 10.1795 1.4623.4815 3.0048.7498 4.7526.8043.4017.0132.4016.0132.8013.0039.3986-.0091.4002-.0091.7995-.022 1.8047-.1189 3.3498-.4745 4.8038-1.1147.2297-.1051.2887-.1361.2562-.1618-.0194-.0155-.864-1.1464-1.8783-2.5125l-1.8426-2.4819-2.309-3.4145c-1.2691-1.8796-2.3124-3.4097-2.3204-3.4097-.0061-.0008-.0067 1.5134-.0085 3.3664-.0019 3.2471-.0026 3.3671-.0469 3.4503-.0601.1122-.1078.16-.1961.2093-.0702.0371-.1322.0437-.4624.0437h-.3814l-.1022-.0647c-.0645-.0411-.1188-.0994-.1552-.1674l-.051-.1003.0026-4.5119.0026-4.5131.0709-.0877c.0368-.0479.1137-.1091.1695-.1373.0914-.0455.1275-.0505.5942-.0505.5488 0 .6671.0249.8164.1983.0453.0514 1.2897 1.9244 2.7666 4.1617l4.4329 6.7153 1.7785 2.6937.091-.0599c.8007-.5329 1.6437-1.2917 2.3153-2.0977 1.4851-1.7789 2.4441-3.9978 2.7785-6.4898.0962-.659.108-.8537.108-1.7474-.0019-.9474-.0123-1.0958-.1083-1.7886C23.0683 4.5143 19.802.6065 15.2762.1019 14.786.048 14.6144.0353 13.9921.0266 13.617.0218 11.8787 0 11.5725 0z"/></svg>' },
  { name: 'GSAP',       category: 'Frontend', color: '#88CE02', bg: 'rgba(136,206,2,0.15)',   floatDur: 4.6, svg: '<svg viewBox="0 0 24 24" fill="#88CE02"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 2.4c5.304 0 9.6 4.296 9.6 9.6s-4.296 9.6-9.6 9.6S2.4 17.304 2.4 12 6.696 2.4 12 2.4zm-.8 3.2v4.8H6.4L12 17.6l5.6-7.2h-4.8V5.6h-1.6z"/></svg>' },
  { name: 'Supabase',   category: 'Backend',  color: '#3ECF8E', bg: 'rgba(62,207,142,0.15)',  floatDur: 4.3, svg: '<svg viewBox="0 0 24 24" fill="#3ECF8E"><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.99 12.017 1.222 12 1.455 12H9.5c.828 0 1.5.672 1.5 1.5v9.464c.015.986 1.26 1.41 1.874.637l9.262-11.652c-.226.033-.458.05-.691.05H13.5c-.828 0-1.5-.672-1.5-1.5V1.036Z"/></svg>' },
  { name: 'Chart.js',   category: 'Tools',    color: '#FF6384', bg: 'rgba(255,99,132,0.15)',  floatDur: 4.9, svg: '<svg viewBox="0 0 24 24" fill="#FF6384"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10S17.523 22 12 22 2 17.523 2 12 6.477 2 12 2zm-1 4v6H7l5 6 5-6h-4V6h-2z"/></svg>' },
  { name: 'Git',        category: 'Tools',    color: '#F05032', bg: 'rgba(240,80,50,0.15)',   floatDur: 5.1, svg: '<svg viewBox="0 0 24 24" fill="#F05032"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>' },
  { name: 'Vercel',     category: 'Tools',    color: '#ffffff', bg: 'rgba(255,255,255,0.08)', floatDur: 4.4, svg: '<svg viewBox="0 0 24 24" fill="#ffffff"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>' },
  { name: 'SEO',        category: 'Tools',    color: '#4285F4', bg: 'rgba(66,133,244,0.15)',  floatDur: 5.3, svg: '<svg viewBox="0 0 24 24" fill="#4285F4"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>' },
]

const categories = ['All', 'Frontend', 'Backend', 'Tools']
const MAX_PER_ROW = 6

function buildRows(items) {
  var rows = []
  for (var i = 0; i < items.length; i += MAX_PER_ROW) {
    rows.push(items.slice(i, i + MAX_PER_ROW))
  }
  return rows
}

function getDelay(indexInRow, rowLength, rowIndex) {
  var centerPos = (rowLength - 1) / 2
  var distCol = Math.abs(indexInRow - centerPos)
  var distRow = rowIndex * 0.5
  return (distCol + distRow) * 0.08
}

function SkillCard({ skill, indexInRow, rowLength, rowIndex, activeKey }) {
  var floatId = 'float_' + activeKey + '_' + skill.name.replace(/[^a-zA-Z0-9]/g, '')
  var delay = getDelay(indexInRow, rowLength, rowIndex)
  var animDuration = skill.floatDur + 's'

  return (
    <>
      <style>{`
        @keyframes ${floatId} {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .skill-card-${floatId} {
          animation: ${floatId} ${animDuration} ease-in-out infinite;
          animation-delay: ${indexInRow * 0.3}s;
        }
        .skill-card-${floatId}:hover {
          animation-play-state: paused;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.94 }}
        transition={{
          duration: 0.4,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={'skill-card-' + floatId + ' group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border cursor-default'}
        style={{
          background: '#111111',
          width: '110px',
          flexShrink: 0,
          willChange: 'transform',
        }}
        onMouseEnter={function(e) {
          var el = e.currentTarget
          el.style.background = skill.bg
          el.style.borderColor = skill.color + '90'
          el.style.boxShadow = '0 16px 40px ' + skill.color + '25, 0 0 20px ' + skill.color + '20'
          el.style.transition = 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
        }}
        onMouseLeave={function(e) {
          var el = e.currentTarget
          el.style.background = '#111111'
          el.style.borderColor = ''
          el.style.boxShadow = 'none'
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110"
          style={{ background: skill.bg }}
          dangerouslySetInnerHTML={{ __html: skill.svg }}
        />
        <p className="text-xs text-muted text-center font-mono group-hover:text-white transition-colors duration-300 whitespace-nowrap">
          {skill.name}
        </p>
      </motion.div>
    </>
  )
}

export default function Skills() {
  var [active, setActive] = useState('All')

  var displayed = active === 'All'
    ? skillsData
    : skillsData.filter(function(s) { return s.category === active })

  var rows = buildRows(displayed)

  return (
    <section
      id="skills"
      className="py-24 px-6 relative overflow-hidden"
      style={{ scrollMarginTop: '100px' }}
    >
      {/* Glow orbs — z-index 0, section punya position relative */}
      <div
        className="absolute pointer-events-none"
        style={{ top: '20%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: '#8b5cf6', filter: 'blur(120px)', opacity: 0.15, zIndex: 0 }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ top: '50%', right: '5%', width: '350px', height: '350px', borderRadius: '50%', background: '#3b82f6', filter: 'blur(140px)', opacity: 0.12, zIndex: 0 }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ bottom: '10%', left: '40%', width: '250px', height: '250px', borderRadius: '50%', background: '#06b6d4', filter: 'blur(100px)', opacity: 0.15, zIndex: 0 }}
      />

      <div className="max-w-6xl mx-auto relative" style={{ zIndex: 1 }}>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent" />
            <span className="font-mono text-xs text-accent tracking-widest uppercase">Tech Stack</span>
            <div className="w-8 h-px bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Tools & Technologies</h2>
          <p className="text-muted text-base">My everyday development toolkit</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(function(cat) {
            return (
              <button
                key={cat}
                onClick={function() { setActive(cat) }}
                className={'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ' + (active === cat ? 'bg-accent text-white shadow-lg' : 'bg-surface border border-border text-muted hover:border-accent hover:text-white')}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Grid — tiap baris flex justify-center agar selalu di tengah */}
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {rows.map(function(row, rowIndex) {
              return (
                <div
                  key={active + '-row-' + rowIndex}
                  className="flex justify-center gap-3"
                >
                  {row.map(function(skill, indexInRow) {
                    return (
                      <SkillCard
                        key={active + '-' + skill.name}
                        skill={skill}
                        indexInRow={indexInRow}
                        rowLength={row.length}
                        rowIndex={rowIndex}
                        activeKey={active}
                      />
                    )
                  })}
                </div>
              )
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}