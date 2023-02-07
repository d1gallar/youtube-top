import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getChannels } from "../../api/server";
import { ChannelType } from "../../components/Channels/Channels";

export default function useChannels() {
  const [channels, setChannels] = useState<Array<ChannelType>>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchChannels = async () => {
    try {
      const response = await getChannels();
      const { data: channelData } = response;
      setChannels(channelData);
    } catch (e) {
      setChannels([]);
      setError(true);
      console.error("Failed to fetch top channels!\n", e);
    }
    setLoading(false);
  };

  const sortByRank = (direction: boolean) => {
    setLoading(true);
    if (direction) {
      const ascending: Array<ChannelType> = [...channels].sort(
        (a: ChannelType, b: ChannelType) => {
          if (a.rank < b.rank) {
            return -1;
          }
          if (a.rank > b.rank) {
            return 1;
          }
          return -1;
        }
      );
      setChannels(ascending);
    } else {
      const descending: Array<ChannelType> = [...channels].sort(
        (a: ChannelType, b: ChannelType) => {
          if (a.rank < b.rank) {
            return 1;
          }
          if (a.rank > b.rank) {
            return -1;
          }
          return -1;
        }
      );
      setChannels(descending);
    }
    setLoading(false);
  };

  const sortByName = (direction: boolean) => {
    setLoading(true);
    if (direction) {
      const ascending: Array<ChannelType> = channels.sort(
        (a: ChannelType, b: ChannelType) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return -1;
        }
      );
      setChannels(ascending);
    } else {
      const descending: Array<ChannelType> = [...channels].sort(
        (a: ChannelType, b: ChannelType) => {
          if (a.title < b.title) {
            return 1;
          }
          if (a.title > b.title) {
            return -1;
          }
          return -1;
        }
      );
      setChannels(descending);
    }
    setLoading(false);
  };

  const sortByCreated = (direction: boolean) => {
    setLoading(true);
    if (direction) {
      const ascending: Array<ChannelType> = channels.sort(
        (a: ChannelType, b: ChannelType) => {
          const aDate = new Date(a.createdAt);
          const bDate = new Date(b.createdAt);
          if (aDate < bDate) {
            return -1;
          }
          if (aDate > bDate) {
            return 1;
          }
          return -1;
        }
      );
      setChannels(ascending);
    } else {
      const descending: Array<ChannelType> = [...channels].sort(
        (a: ChannelType, b: ChannelType) => {
          const aDate = new Date(a.createdAt);
          const bDate = new Date(b.createdAt);
          if (aDate < bDate) {
            return 1;
          }
          if (aDate > bDate) {
            return -1;
          }
          return -1;
        }
      );
      setChannels(descending);
    }
    setLoading(false);
  };

  const sortByUploads = (direction: boolean) => {
    setLoading(true);
    if (direction) {
      const ascending: Array<ChannelType> = channels.sort(
        (a: ChannelType, b: ChannelType) => {
          const aUpload = Number.parseInt(a.uploads);
          const bUpload = Number.parseInt(b.uploads);
          if (aUpload < bUpload) {
            return -1;
          }
          if (aUpload > bUpload) {
            return 1;
          }
          return -1;
        }
      );
      setChannels(ascending);
    } else {
      const descending: Array<ChannelType> = [...channels].sort(
        (a: ChannelType, b: ChannelType) => {
          const aUpload = Number.parseInt(a.uploads);
          const bUpload = Number.parseInt(b.uploads);
          if (aUpload < bUpload) {
            return 1;
          }
          if (aUpload > bUpload) {
            return -1;
          }
          return -1;
        }
      );
      setChannels(descending);
    }
    setLoading(false);
  };

  const sortByViews = (direction: boolean) => {
    setLoading(true);
    if (direction) {
      const ascending: Array<ChannelType> = channels.sort(
        (a: ChannelType, b: ChannelType) => {
          const aViews = Number.parseInt(a.views);
          const bViews = Number.parseInt(b.views);
          if (aViews < bViews) {
            return -1;
          }
          if (aViews > bViews) {
            return 1;
          }
          return -1;
        }
      );
      setChannels(ascending);
    } else {
      const descending: Array<ChannelType> = [...channels].sort(
        (a: ChannelType, b: ChannelType) => {
          const aViews = Number.parseInt(a.views);
          const bViews = Number.parseInt(b.views);
          if (aViews < bViews) {
            return 1;
          }
          if (aViews > bViews) {
            return -1;
          }
          return -1;
        }
      );
      setChannels(descending);
    }
    setLoading(false);
  };

  const sortBySubscribers = (direction: boolean) => {
    setLoading(true);
    if (direction) {
      const ascending: Array<ChannelType> = channels.sort(
        (a: ChannelType, b: ChannelType) => {
          const aSubs = Number.parseInt(a.subscriberCount);
          const bSubs = Number.parseInt(b.subscriberCount);
          if (aSubs < bSubs) {
            return -1;
          }
          if (aSubs > bSubs) {
            return 1;
          }
          return -1;
        }
      );
      setChannels(ascending);
    } else {
      const descending: Array<ChannelType> = [...channels].sort(
        (a: ChannelType, b: ChannelType) => {
          const aSubs = Number.parseInt(a.subscriberCount);
          const bSubs = Number.parseInt(b.subscriberCount);
          if (aSubs < bSubs) {
            return 1;
          }
          if (aSubs > bSubs) {
            return -1;
          }
          return -1;
        }
      );
      setChannels(descending);
    }
    setLoading(false);
  };

  const sortByCountry = (direction: boolean) => {
    setLoading(true);
    if (direction) {
      const ascending: Array<ChannelType> = channels.sort(
        (a: ChannelType, b: ChannelType) => {
          if (a.country.match(/[-]/) && !b.country.match(/[-]/)) return 1;
          if (a.country < b.country) {
            return -1;
          }
          if (a.country > b.country) {
            return 1;
          }
          return -1;
        }
      );
      setChannels(ascending);
    } else {
      const descending: Array<ChannelType> = [...channels].sort(
        (a: ChannelType, b: ChannelType) => {
          if (a.country < b.country) {
            return 1;
          }
          if (a.country > b.country) {
            return -1;
          }
          return -1;
        }
      );
      setChannels(descending);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  return {
    channels,
    setChannels,
    isLoading,
    error,
    sortByRank,
    sortByName,
    sortByCreated,
    sortByUploads,
    sortByViews,
    sortBySubscribers,
    sortByCountry,
  };
}
