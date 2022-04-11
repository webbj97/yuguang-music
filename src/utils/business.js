/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-30 13:13:58
 */
import { getAlbum } from '@/api';
import { formatTime, isDef } from '@utils';

export function createSong(song) {
    const { id, name, img, artists, duration, albumId, albumName, mvId, ...rest } = song;
    return {
        id,
        name,
        img,
        artists,
        duration,
        albumName,
        url: genSongPlayUrl(song.id),
        artistsText: genArtistisText(artists),
        durationSecond: duration / 1000,
        durationStr: formatTime(duration / 1000),
        // 专辑 如果需要额外请求封面的话必须加上
        albumId,
        // mv的id 如果有的话 会在songTable组件中加上mv链接。
        mvId,
        ...rest
    }
}

export function genArtistisText(artists) {
    return (artists || []).map(({ name }) => name).join('/')
}

function genSongPlayUrl(id) {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export async function getSongImg(id, albumId) {
    if (!isDef(albumId)) {
        throw new Error('need albumId')
    }
    const { songs } = await getAlbum(albumId)
    const {
        al: { picUrl }
    } = songs.find(({ id: songId }) => songId === id) || {}
    return picUrl
}