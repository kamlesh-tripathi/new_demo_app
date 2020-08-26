using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectApi
{
    public class MeetingInfo
    {
        public int MeetingId { get; set; }
        public string MeetingSubject { get; set; }
        public string MeetingAttendees { get; set; }
        public string MeetingAgenda { get; set; }
        public System.DateTime MeetingDateTime { get; set; }
    }
}
