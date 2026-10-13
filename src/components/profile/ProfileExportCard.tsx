import React, { useMemo } from 'react';
import {
  Crown,
  Trophy,
  Star,
  Clock,
  Film,
  Award,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { Anime } from '../../types';
import type { UserProfile } from '../../services/profileService';
import { calculateOtakuLevel } from '../../services/xpService';
import {
  calculateUserAchievements,
  getAnimeWatchedEpisodes,
  type Achievement,
} from '../../services/achievementService';
import { isDeveloperEmail } from '../../services/profileService';
import { HexBadge, type BadgeTone } from './HexBadge';

export interface ProfileExportCardProps {
  userProfile: UserProfile | null;
  animes: Anime[];
  userName: string;
  avatarUrl?: string;
  cardRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const ProfileExportCard: React.FC<ProfileExportCardProps> = ({
  userProfile,
  animes,
  userName,
  avatarUrl,
  cardRef,
  className = '',
}) => {
  // 1. Estatísticas calculadas fielmente com base na coleção
  const stats = useMemo(() => {
    let totalEps = 0;
    let ratedCount = 0;
    let scoreSum = 0;

    animes.forEach((a) => {
      totalEps += getAnimeWatchedEpisodes(a);
      if (typeof a.rating === 'number' && a.rating > 0) {
        scoreSum += a.rating;
        ratedCount++;
      }
    });

    const totalMinutes = Math.round(totalEps * 23.5);
    const days = Math.floor(totalMinutes / (24 * 60));
    const remainingHours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const totalHours = Math.round(totalMinutes / 60);

    const formattedTime =
      days > 0 ? `${days}d ${remainingHours}h` : `${totalHours}h`;
    const meanScore = ratedCount > 0 ? (scoreSum / ratedCount).toFixed(1) : '—';

    return {
      totalEps,
      formattedTime,
      meanScore,
    };
  }, [animes]);

  // 2. Nível Otaku
  const otakuLevel = useMemo(() => calculateOtakuLevel(animes), [animes]);

  // 3. Top 5 Animes Favoritos
  const top5Animes = useMemo(() => {
    const ids =
      (userProfile as any)?.top5AnimeIds ||
      userProfile?.favoriteAnimeIds ||
      [];
    const list: (Anime | null)[] = [null, null, null, null, null];

    ids.slice(0, 5).forEach((id: string, index: number) => {
      const found = animes.find((a) => a.id === id);
      if (found) list[index] = found;
    });

    if (list.every((item) => item === null) && animes.length > 0) {
      const sorted = [...animes]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5);
      sorted.forEach((item, index) => {
        list[index] = item;
      });
    }

    return list;
  }, [userProfile, animes]);

  // 4. Insígnias Equipadas (5 slots)
  const slotBadges = useMemo(() => {
    const effectiveEmail = userProfile?.email;
    const result = calculateUserAchievements(animes, effectiveEmail);
    const calculated = result.achievements;
    const featured = userProfile?.featuredBadges || [];

    return [0, 1, 2, 3, 4].map((index) => {
      const badgeId = featured[index];
      if (!badgeId) return null;
      const ach = calculated.find((a) => a.id === badgeId && a.isUnlocked);
      return ach || null;
    });
  }, [animes, userProfile]);

  const getBadgeTone = (tier: string): BadgeTone => {
    switch (tier) {
      case 'diamond':
        return 'cyan';
      case 'platinum':
        return 'purple';
      case 'gold':
        return 'gold';
      case 'silver':
        return 'blue';
      default:
        return 'amber';
    }
  };

  const isDevAdmin = Boolean(
    userProfile?.email && isDeveloperEmail(userProfile.email)
  );

  const displayNick =
    userProfile?.publicUsername?.replace(/^@/, '') || userName.replace(/^@/, '');
  const displayTitle = userProfile?.honoraryTitle || 'Viajante dos Animes';
  const displayBio =
    userProfile?.publicBio ||
    'Animes, boas histórias e grandes emoções. Esse é o meu mundo.';
  const effectiveAvatar = userProfile?.customAvatarUrl || avatarUrl;
  const effectiveBanner = userProfile?.bannerUrl;

  // Ordem olímpica do pódio: 4º, 2º, 1º, 3º, 5º
  const podiumOrder = [
    { rank: 4, label: '4º', index: 3, border: 'border-white/15', isCenter: false },
    { rank: 2, label: '2º', index: 1, border: 'border-slate-300/60 shadow-md shadow-slate-400/10', isCenter: false },
    { rank: 1, label: '1º', index: 0, border: 'border-amber-400 shadow-lg shadow-amber-500/25 ring-2 ring-amber-400/40', isCenter: true },
    { rank: 3, label: '3º', index: 2, border: 'border-amber-600/60 shadow-md shadow-amber-600/10', isCenter: false },
    { rank: 5, label: '5º', index: 4, border: 'border-white/15', isCenter: false },
  ];

  return (
    <div
      ref={cardRef}
      id="profile-export-card"
      style={{
        width: '450px',
        height: '800px',
        boxSizing: 'border-box',
      }}
      className={`relative bg-[#070a14] text-white overflow-hidden rounded-[28px] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between font-sans select-none ${className}`}
    >
      {/* ========================================================================= */}
      {/* 1. TOPO: BANNER PANORÂMICO COM FUSÃO SUAVE */}
      {/* ========================================================================= */}
      <div className="relative w-full h-[180px] shrink-0 overflow-hidden bg-slate-950">
        {effectiveBanner ? (
          <img
            src={effectiveBanner}
            alt="Banner"
            crossOrigin="anonymous"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-black relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent" />
          </div>
        )}

        {/* Gradiente sutil para fundir o banner no fundo escuro sem linhas duras */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#070a14]" />

        {/* Marca d'água discreta no canto superior direito */}
        <div className="absolute top-3.5 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black text-amber-300">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>WANIME</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. IDENTIDADE DO USUÁRIO (AVATAR FLUTUANTE, NICK, TÍTULO E BIO) */}
      {/* ========================================================================= */}
      <div className="px-5 -mt-12 relative z-20 shrink-0">
        <div className="flex items-start gap-3.5">
          {/* Avatar com Moldura Dourada */}
          <div className="relative shrink-0">
            <div className="w-[76px] h-[76px] rounded-full p-1 bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.35)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                {effectiveAvatar ? (
                  <img
                    src={effectiveAvatar}
                    alt={displayNick}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-black text-amber-300">
                    {displayNick.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            {/* Badge de Nível sobreposta no avatar */}
            <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-black/90 border border-amber-400 text-[9px] font-black text-amber-300 shadow-md">
              Nv.{otakuLevel.level}
            </div>
          </div>

          {/* Informações de Perfil */}
          <div className="pt-2 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-lg font-black text-white tracking-tight truncate max-w-[210px]">
                @{displayNick}
              </h2>
              {isDevAdmin && (
                <span className="px-1.5 py-0.5 rounded-md bg-purple-500/25 border border-purple-400/50 text-[8.5px] font-black text-purple-300 uppercase">
                  DEV
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mt-0.5 truncate">
              <Crown className="w-3.5 h-3.5 fill-amber-400 shrink-0" />
              <span className="truncate">{displayTitle}</span>
            </div>

            <p className="mt-1 text-[11px] text-slate-300 leading-snug line-clamp-2 max-w-[340px]">
              {displayBio}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ESTATÍSTICAS CONDENSADAS (3 MÉTRICAS ESSENCIAIS) */}
      {/* ========================================================================= */}
      <div className="px-5 mt-2.5 shrink-0">
        <div className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-2 px-3 shadow-inner grid grid-cols-3 divide-x divide-white/5 text-center">
          {/* Tempo */}
          <div className="flex flex-col items-center justify-center px-1">
            <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium">
              <Clock className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Tempo</span>
            </div>
            <span className="text-xs font-black text-white mt-0.5 tabular-nums">
              {stats.formattedTime}
            </span>
          </div>

          {/* Episódios */}
          <div className="flex flex-col items-center justify-center px-1">
            <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium">
              <Film className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Episódios</span>
            </div>
            <span className="text-xs font-black text-white mt-0.5 tabular-nums">
              {stats.totalEps.toLocaleString('pt-BR')}
            </span>
          </div>

          {/* Nota Média */}
          <div className="flex flex-col items-center justify-center px-1">
            <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 shrink-0" />
              <span>Média</span>
            </div>
            <span className="text-xs font-black text-white mt-0.5 tabular-nums">
              {stats.meanScore}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. TOP 5 ANIMES FAVORITOS (PÓDIO OLÍMPICO CONDENSADO) */}
      {/* ========================================================================= */}
      <div className="px-5 mt-2.5 shrink-0">
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-2.5 relative">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-5 h-5 rounded-md bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-3 h-3 fill-amber-400" />
            </div>
            <h3 className="text-xs font-black text-white tracking-wide">
              Top 5 Animes Favoritos
            </h3>
          </div>

          <div className="grid grid-cols-5 gap-1.5 items-end pt-3 pb-1">
            {podiumOrder.map((slot) => {
              const anime = top5Animes[slot.index];
              const isFirst = slot.isCenter;

              return (
                <div
                  key={`card-podium-${slot.rank}`}
                  className={`flex flex-col items-center justify-end relative ${
                    isFirst ? 'scale-105 z-10' : 'scale-95 opacity-95'
                  }`}
                >
                  {/* Coroa Dourada no 1º lugar */}
                  {isFirst && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                      <Crown className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                    </div>
                  )}

                  {/* Card do Anime */}
                  <div
                    className={`w-full aspect-[2/3] rounded-lg overflow-hidden relative flex flex-col justify-between p-1 bg-black/60 border ${slot.border}`}
                  >
                    {/* Imagem de Capa */}
                    {anime?.coverUrl ? (
                      <img
                        src={anime.coverUrl}
                        alt={anime.title}
                        crossOrigin="anonymous"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center p-1 text-center">
                        <span className="text-[8px] text-slate-500">
                          {anime ? anime.title.slice(0, 8) : slot.label}
                        </span>
                      </div>
                    )}

                    {/* Gradiente escuro para legibilidade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />

                    {/* Tag de Nota no Topo */}
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="px-1 py-0.2 rounded-full bg-black/80 border border-amber-400/40 text-[7px] font-black text-amber-300 flex items-center gap-0.5">
                        <Star className="w-2 h-2 fill-amber-300 text-amber-300" />
                        <span>{anime?.rating ? anime.rating : '—'}</span>
                      </div>
                    </div>

                    {/* Posicionamento e Título na Base */}
                    <div className="relative z-10 text-center w-full">
                      <span className="block text-[8px] font-black text-white/90 truncate leading-tight">
                        {anime?.title || `Vazio`}
                      </span>
                      <span
                        className={`inline-block px-1 rounded-sm text-[7px] font-black uppercase ${
                          isFirst
                            ? 'bg-amber-400 text-black'
                            : 'bg-black/60 text-slate-300'
                        }`}
                      >
                        {slot.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. INSÍGNIAS EQUIPADAS (5 SLOTS DE HONRA) */}
      {/* ========================================================================= */}
      <div className="px-5 mt-2.5 shrink-0">
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-2.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-5 h-5 rounded-md bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Award className="w-3 h-3 text-amber-400" />
            </div>
            <h3 className="text-xs font-black text-white tracking-wide">
              Insígnias Equipadas
            </h3>
          </div>

          <div className="grid grid-cols-5 gap-1.5 py-1">
            {slotBadges.map((badge, idx) => {
              if (badge) {
                return (
                  <div
                    key={`export-badge-${idx}-${badge.id}`}
                    className="flex flex-col items-center justify-center text-center p-1 rounded-xl bg-white/[0.02] border border-white/10 h-[68px]"
                  >
                    <HexBadge
                      badgeId={badge.id}
                      title={badge.title}
                      icon={badge.icon}
                      tone={getBadgeTone(badge.tier)}
                      isUnlocked={true}
                      size="sm"
                      showSubtitle={false}
                      showTitle={false}
                    />
                    <span className="text-[7.5px] font-bold text-slate-300 truncate w-full mt-1 px-0.5">
                      {badge.title}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={`export-empty-${idx}`}
                  className="flex flex-col items-center justify-center text-center rounded-xl border border-dashed border-white/10 bg-black/30 h-[68px]"
                >
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-slate-600 text-[10px]">
                    ·
                  </div>
                  <span className="text-[7.5px] text-slate-500 mt-1">Vazio</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. RODAPÉ INSTITUCIONAL (WANIME PORTAL) */}
      {/* ========================================================================= */}
      <div className="px-5 py-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 shrink-0 bg-black/40">
        <span className="font-semibold text-slate-400">
          WANIME • Perfil Otaku
        </span>
        <span className="font-mono text-amber-400/80 text-[9.5px]">
          wanimelist.com.br
        </span>
      </div>
    </div>
  );
};
