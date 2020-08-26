using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepoDemo;

namespace ProjectApi.Controllers
{
    [EnableCors("MyPolicy")]
    [ApiController]
    public class MeetingController : ControllerBase
    {
        [Route("api/Meeting/GetMeetings")]
        [HttpGet]
        public IEnumerable<MeetingInfo> GetMeetings()
        {
            List<MeetingInfo> meetings = new List<MeetingInfo>();
            RepoDemo.MeetingDemoEntities DB = new RepoDemo.MeetingDemoEntities();
            var meetingDetails = DB.MeetingDetails;
            foreach (var meeting in meetingDetails)
            {
                meetings.Add(new MeetingInfo
                {
                    MeetingAgenda = meeting.MeetingAgenda,
                    MeetingAttendees = meeting.MeetingAttendees,
                    MeetingDateTime = meeting.MeetingDateTime,
                    MeetingId = meeting.MeetingId,
                    MeetingSubject = meeting.MeetingSubject
                });
            }
            return meetings;
        }

        [Route("api/Meeting/GetMeetingById/{meetingId}")]
        [HttpGet]
        public MeetingInfo GetMeetingById(int meetingId)
        {
            RepoDemo.MeetingDemoEntities DB = new RepoDemo.MeetingDemoEntities();
            var meeting = DB.MeetingDetails.FirstOrDefault(x => x.MeetingId == meetingId);
            return new MeetingInfo
            {
                MeetingAgenda = meeting.MeetingAgenda,
                MeetingAttendees = meeting.MeetingAttendees,
                MeetingDateTime = meeting.MeetingDateTime,
                MeetingId = meeting.MeetingId,
                MeetingSubject = meeting.MeetingSubject
            };
        }

        [Route("api/Meeting/SetMeeting")]
        [HttpPost]
        public void SetMeeting(MeetingInfo meeting)
        {
            using (var context = new RepoDemo.MeetingDemoEntities())
            {
                var meetingInfo = new MeetingDetail
                {
                    MeetingAgenda = meeting.MeetingAgenda,
                    MeetingAttendees = meeting.MeetingAttendees,
                    MeetingDateTime = meeting.MeetingDateTime,
                    MeetingSubject = meeting.MeetingSubject
                };
                context.MeetingDetails.Add(meetingInfo);
                context.SaveChanges();
            }
        }

        [Route("api/Meeting/UpdateMeetingById")]
        [HttpPost]
        public void UpdateMeetingById(MeetingInfo meeting)
        {
            using (var context = new RepoDemo.MeetingDemoEntities())
            {
                var meetingInfo = new MeetingDetail
                {
                    MeetingAgenda = meeting.MeetingAgenda,
                    MeetingAttendees = meeting.MeetingAttendees,
                    MeetingDateTime = meeting.MeetingDateTime,
                    MeetingId = meeting.MeetingId,
                    MeetingSubject = meeting.MeetingSubject
                };
                context.Entry(meetingInfo).State = EntityState.Modified;
                context.SaveChanges();
            }
        }

        [Route("api/Meeting/DeleteMeetingById")]
        [HttpPost]
        public void DeleteMeetingById(MeetingInfo meeting)
        {
            using (var context = new RepoDemo.MeetingDemoEntities())
            {
                context.MeetingDetails.Remove(context.MeetingDetails.Single(x => x.MeetingId == meeting.MeetingId));
                context.SaveChanges();
            }
        }
    }
}