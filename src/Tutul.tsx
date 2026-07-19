import React from 'react';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

export type TutulMood = 'happy' | 'cheering' | 'thinking';

// Tutul the tiger cub — mascot from the blueprint, states: happy / cheering / thinking
export default function Tutul({ size = 120, mood = 'happy' }: { size?: number; mood?: TutulMood }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* ears */}
      <Circle cx={30} cy={30} r={16} fill="#F07A2E" />
      <Circle cx={90} cy={30} r={16} fill="#F07A2E" />
      <Circle cx={30} cy={30} r={8} fill="#FFD3A6" />
      <Circle cx={90} cy={30} r={8} fill="#FFD3A6" />
      {/* head */}
      <Circle cx={60} cy={62} r={40} fill="#FF9E44" />
      <Path d="M60 24 l-6 15 h12 z" fill="#5A3418" />
      <Path d="M35 45 q8 5 5 15" stroke="#5A3418" strokeWidth={4} fill="none" strokeLinecap="round" />
      <Path d="M85 45 q-8 5 -5 15" stroke="#5A3418" strokeWidth={4} fill="none" strokeLinecap="round" />
      <Ellipse cx={60} cy={76} rx={25} ry={19} fill="#FFF3E0" />
      {/* eyes */}
      {mood === 'cheering' ? (
        <>
          <Path d="M41 58 q6 -6 12 0" stroke="#2D2A32" strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <Path d="M67 58 q6 -6 12 0" stroke="#2D2A32" strokeWidth={3.5} fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <Circle cx={47} cy={58} r={7.5} fill="#2D2A32" />
          <Circle cx={73} cy={58} r={7.5} fill="#2D2A32" />
          <Circle cx={49.5} cy={55.5} r={2.6} fill="#fff" />
          <Circle cx={75.5} cy={55.5} r={2.6} fill="#fff" />
          {mood === 'thinking' && (
            <Circle cx={47} cy={58} r={10} fill="none" stroke="#4D96FF" strokeWidth={2} />
          )}
        </>
      )}
      {/* nose + mouth */}
      <Path d="M54 68 h12 l-6 7 z" fill="#E8607A" />
      {mood === 'cheering' ? (
        <Path d="M52 78 q8 5 16 0" stroke="#5A3418" strokeWidth={3} fill="none" strokeLinecap="round" />
      ) : mood === 'thinking' ? (
        <Path d="M50 76 q10 -4 20 0" stroke="#5A3418" strokeWidth={3} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M60 75 q-9 8 -15 3 M60 75 q9 8 15 3" stroke="#5A3418" strokeWidth={3} fill="none" strokeLinecap="round" />
      )}
    </Svg>
  );
}
