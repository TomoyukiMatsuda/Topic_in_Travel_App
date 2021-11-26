import React, { memo } from "react";
import { useFetchSpeakers } from "../../hooks/useFetchSpeakers";
import { SpeakerItem } from "../SpeakerItem";
import { useRecoilValue } from "recoil";
import { speakersSelector } from "../../states/speakers/speakersState";

// 話す人一覧画面コンポーネント
export const Speakers: React.VFC = memo(() => {
  useFetchSpeakers();
  const speakers = useRecoilValue(speakersSelector);

  return (
    <div>
      {!!speakers.length && (
        <div className="px-5">
          {speakers.map((speaker) => {
            return (
              <div
                className="flex justify-between my-5 border-b-2"
                key={speaker.id}
              >
                <SpeakerItem
                  id={speaker.id}
                  userId={speaker.userId}
                  name={speaker.name}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
