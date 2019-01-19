using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebGYM.Common;
using WebGYM.Interface;
using WebGYM.Models;
using WebGYM.ViewModels;

namespace WebGYM.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterMemberController : ControllerBase
    {
        private readonly IMemberRegistration _memberRegistration;
        private readonly IUrlHelper _urlHelper;

        public RegisterMemberController(IUrlHelper urlHelper, IMemberRegistration memberRegistration)
        {
            _memberRegistration = memberRegistration;
            _urlHelper = urlHelper;
        }
        // GET: api/RegisterMember
        [HttpGet(Name = "GetAll")]
        public IActionResult GetAll([FromQuery] QueryParameters queryParameters)
        {
            var userId = Convert.ToInt32(this.User.FindFirstValue(ClaimTypes.Name));
            List<MemberRegistrationGridModel> allMembers = _memberRegistration.GetAll(queryParameters, userId).ToList();

            var allItemCount = _memberRegistration.Count(userId);

            var paginationMetadata = new
            {
                totalCount = allItemCount,
                pageSize = queryParameters.PageCount,
                currentPage = queryParameters.Page,
                totalPages = queryParameters.GetTotalPages(allItemCount)
            };

            Request.HttpContext.Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(paginationMetadata));

            return Ok(new
            {
                value = allMembers
            });
        }

        // GET: api/RegisterMember/5
        [HttpGet("{id}", Name = "GetMember")]
        public MemberRegistrationViewModel Get(int id)
        {
            return _memberRegistration.GetMemberbyId(id);
        }

        // POST: api/RegisterMember
        [HttpPost]
        public HttpResponseMessage Post([FromBody] MemberRegistrationViewModel member)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (!_memberRegistration.CheckNameExits(member.MemberFName, member.MemberLName, member.MemberMName))
                    {
                        var userId = this.User.FindFirstValue(ClaimTypes.Name);
                        var automember = AutoMapper.Mapper.Map<MemberRegistration>(member);
                        automember.JoiningDate = DateTime.Now;
                        automember.Createdby = Convert.ToInt32(userId);

                        var result = _memberRegistration.InsertMember(automember);
                        if (result > 0)
                        {
                            var response = new HttpResponseMessage()
                            {
                                StatusCode = HttpStatusCode.OK
                            };
                            return response;
                        }
                        else
                        {
                            var response = new HttpResponseMessage()
                            {
                                StatusCode = HttpStatusCode.BadRequest
                            };
                            return response;
                        }
                    }
                    else
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.Conflict
                        };
                        return response;
                    }
                }
                else
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                    return response;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        // PUT: api/RegisterMember/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] MemberRegistrationViewModel member)
        {

            if (ModelState.IsValid)
            {
                var storedMemberid =
                    _memberRegistration.CheckNameExitsforUpdate(member.MemberFName, member.MemberLName,
                        member.MemberMName);
                if (storedMemberid == member.MemberId || storedMemberid == 0)
                {
                    var automember = AutoMapper.Mapper.Map<MemberRegistration>(member);
                    automember.JoiningDate = DateTime.Now;
                    
                    var result = _memberRegistration.UpdateMember(automember);
                    if (result > 0)
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.OK
                        };
                        return response;
                    }
                    else
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.BadRequest
                        };
                        return response;
                    }
                }
                else
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.Conflict
                    };
                    return response;
                }
            }
            else
            {
                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
                return response;
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(long id)
        {
            try
            {
                var result = _memberRegistration.DeleteMember(id);

                if (result)
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };
                    return response;
                }
                else
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                    return response;
                }
            }
            catch (Exception)
            {
                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.InternalServerError
                };
                return response;
            }
        }


    }
}
