"use client"

import { skills } from '@/constants';
import React, { useEffect, useRef, useState } from 'react';

interface Skill {
  id: number;
  src: string;
  title: string;
  desc?: string;
}

interface SkillItemProps {
  skill: Skill;
  index: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on whether element is intersecting
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`transform transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`
      }}
    >
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-md shadow-[0_0_15px_3px_rgba(0,215,180,0.7),0_0_40px_10px_rgba(0,223,228,0.4)] p-6 hover:from-white/30 hover:via-white/20 hover:to-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
        {/* Glossy overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
        
        <div className="relative z-10 flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border shadow-[0_0_15px_3px_rgba(0,115,180,0.7),0_0_40px_10px_rgba(0,123,228,0.4)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img
                src={skill.src}
                alt={skill.title}
                className="w-10 h-10 object-contain filter drop-shadow-sm"
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              {skill.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {skill.desc || "No description available"}
            </p>
          </div>
        </div>
        
        {/* Subtle shine effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl">
          <div className="absolute -top-full -left-full w-full h-full bg-gradient-to-br from-white/30 via-transparent to-transparent rotate-12 group-hover:top-full group-hover:left-full transition-all duration-700 ease-out"></div>
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on whether element is intersecting
        setTitleVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div className="py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-10 transform transition-all duration-700 ease-out ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent mb-4">
            Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <SkillItem key={skill.id} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}