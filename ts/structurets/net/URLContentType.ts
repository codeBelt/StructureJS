
/**
 * The URLContentType...
 *
 * @class URLContentType
 * @module StructureJS
 * @submodule net
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class URLContentType
    {
//http://www.freeformatter.com/mime-types-list.html

        constructor()
        {
        }

        public static DEFAULT:string = "application/x-www-form-urlencoded";

        /*
         * Audio
         */
        public static ATOM:string = "application/atom+xml";
        public static JSON:string = "application/json";
        public static PDF:string = "application/pdf";
        public static RDF:string = "application/rdf+xml";
        public static RSS:string = "application/rss+xml";
        public static SOAP:string = "application/soap+xml";
        public static FONT_WOFF:string = "application/font-woff";
        public static XML:string = "application/xml";
        public static XHTML:string = "application/xhtml+xml";
        public static ZIP:string = "application/zip";
        public static GZIP:string = "application/gzip";

        /*
         * Audio
         */
        public static BASIC:string = "audio/basic";
        public static L24:string = "audio/L24";
        public static MP4:string = "audio/mp4";
        public static MP3:string = "audio/mpeg";
        public static MPEG:string = "audio/mpeg";
        public static OGG:string = "audio/ogg";
        public static VORBIS:string = "audio/vorbis";
        public static REAL_AUDIO:string = "audio/vnd.rn-realaudio";
        public static WAV:string = "audio/vnd.wave";
        public static WEBM:string = "audio/webm";
    }
}
/*Type message [edit]
 message/http: Defined in RFC 2616
 message/imdn+xml: IMDN Instant Message Disposition Notification; Defined in RFC 5438
 message/partial: Email; Defined in RFC 2045 and RFC 2046
 message/rfc822: Email; EML files, MIME files, MHT files, MHTML files; Defined in RFC 2045 and RFC 2046
 Type model [edit]
 For 3D models.
 model/example: Defined in RFC 4735
 model/iges: IGS files, IGES files; Defined in RFC 2077
 model/mesh: MSH files, MESH files; Defined in RFC 2077, SILO files
 model/vrml: WRL files, VRML files; Defined in RFC 2077
 model/x3d+binary: X3D ISO standard for representing 3D computer graphics, X3DB binary files
 model/x3d+vrml: X3D ISO standard for representing 3D computer graphics, X3DV VRML files
 model/x3d+xml: X3D ISO standard for representing 3D computer graphics, X3D XML files
 Type multipart [edit]
 For archives and other objects made of more than one part.
 multipart/mixed: MIME Email; Defined in RFC 2045 and RFC 2046
 multipart/alternative: MIME Email; Defined in RFC 2045 and RFC 2046
 multipart/related: MIME Email; Defined in RFC 2387 and used by MHTML (HTML mail)
 multipart/form-data: MIME Webform; Defined in RFC 2388
 multipart/signed: Defined in RFC 1847
 multipart/encrypted: Defined in RFC 1847
 Type text [edit]
 For human-readable text and source code.
 text/cmd: commands; subtype resident in Gecko browsers like Firefox 3.5
 text/css: Cascading Style Sheets; Defined in RFC 2318
 text/csv: Comma-separated values; Defined in RFC 4180
 text/html: HTML; Defined in RFC 2854
 text/javascript (Obsolete): JavaScript; Defined in and obsoleted by RFC 4329 in order to discourage its usage in favor of application/javascript. However, text/javascript is allowed in HTML 4 and 5 and, unlike application/javascript, has cross-browser support. The "type" attribute of the <script> tag in HTML5 is optional and there is no need to use it at all since all browsers have always assumed the correct default (even in HTML 4 where it was required by the specification).
 text/plain: Textual data; Defined in RFC 2046 and RFC 3676
 text/vcard: vCard (contact information); Defined in RFC 6350
 text/xml: Extensible Markup Language; Defined in RFC 3023
 Type video [edit]
 For video.
 video/mpeg: MPEG-1 video with multiplexed audio; Defined in RFC 2045 and RFC 2046
 video/mp4: MP4 video; Defined in RFC 4337
 video/ogg: Ogg Theora or other video (with audio); Defined in RFC 5334
 video/quicktime: QuickTime video; Registered[15]
 video/webm: WebM Matroska-based open media format
 video/x-matroska: Matroska open media format
 video/x-ms-wmv: Windows Media Video; Documented in Microsoft KB 288102
 video/x-flv: Flash video (FLV files)*/
