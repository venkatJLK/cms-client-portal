import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  Flex,
  Button,
  Grid,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  useDisclosure,
  List,
  ListItem,
  Divider,
  ModalFooter,
  IconButton,
  Input,
  Img,
} from "@chakra-ui/react";
import { FiMaximize2 } from "react-icons/fi";
import { FaDownload, FaPrint, FaEnvelope } from "react-icons/fa";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import dayjs, { Dayjs } from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Images from "../common/image/Images";
import "./ReportsStyle.css";

const reportData = [
  {
    id: 1,
    date: "2025-05-30",
    time: "09:00 AM",
    image: Images.reportImage1,
    description: [
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
    ],
  },
  {
    id: 2,
    date: "2025-06-16",
    time: "02:00 PM",
    image: Images.reportImage2,
    description: [
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
    ],
  },
  {
    id: 3,
    date: "2025-06-11",
    time: "08:00 AM",
    image: Images.reportImage3,
    description: [
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
    ],
  },
  {
    id: 4,
    date: "2025-07-22",
    time: "10:15 AM",
    image: Images.reportImage1,
    description: [
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
      "A doctor's report is a formal medical",
    ],
  },
];

const ReportContent = ({ report, onExpand }) => (
  <Box className="reportContainer" >
    <Flex justify="space-between" mb={2}>
      <Text fontWeight="400px" color="#404750">
        {dayjs(report.date).format("D MMMM YYYY")}, {report.time}
      </Text>
      <Text
        onClick={() => onExpand(report)}
        className="expandText"
      >
        <Icon as={FiMaximize2} mr={1} className="fullScreenIcon"/>
        Full Screen
      </Text>
    </Flex>

    <Text fontWeight="semibold" fontSize="lg" mb={2}>
      Report
    </Text>

    <Image
      src={report.image}
      className="reportImage"
      alt="Report"
    />

    <Box className="reportDescription">
      <Heading size="sm" mb={2}>
        Suggestion
      </Heading>
      <List spacing={1} styleType="disc" pl={4}>
        {report.description.map((item, idx) => (
          <ListItem key={idx} color={"#6A7078"}>
            {item}
          </ListItem>
        ))}
      </List>
    </Box>
  </Box>
);

const ReportContainer = () => {
  const [expandedReport, setExpandedReport] = useState<any | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const today = dayjs();
  const threeMonthsAgo = today.subtract(3, "month");
  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>([
    threeMonthsAgo.toDate(),
    today.toDate(),
  ]);

  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>([
    threeMonthsAgo,
    today,
  ]);

  const filteredReports = useMemo(() => {
    return reportData.filter((r) => {
      const reportDate = dayjs(r.date);
      if (!dateRange) return true;
      const [start, end] = dateRange;
      return (
        reportDate.isAfter(start.startOf("day")) &&
        reportDate.isBefore(end.endOf("day"))
      );
    });
  }, [dateRange]);

  const currentReports = useMemo(() => {
    if (filteredReports.length <= 3) return filteredReports;
    return filteredReports.slice(slideIndex, slideIndex + 3);
  }, [filteredReports, slideIndex]);

  const handleExpand = (report: any) => {
    setExpandedReport(report);
    onOpen();
  };

  useEffect(() => {
    setSlideIndex(0);
  }, [dateRange]);

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4} gap={4} flexWrap="wrap">
        <Heading size="md">Reports</Heading>

        <Flex align="center" gap={3}>
          <DatePicker
            selectsRange
            startDate={selectedRange[0]}
            endDate={selectedRange[1]}
            onChange={(dates: [Date | null, Date | null]) => {
              setSelectedRange(dates);
              const [start, end] = dates;
              if (start && end) {
                setDateRange([dayjs(start), dayjs(end)]);
              } else {
                setDateRange(null);
              }
            }}
            placeholderText="Select date range"
            dateFormat="yyyy/MM/d"
            customInput={<Input w="300px" />}
            isClearable
          />
        </Flex>
      </Flex>

      <Flex className="carouselWrapper">
        {slideIndex > 0 && (
          <div
            onClick={() => setSlideIndex((prev) => Math.max(prev - 1, 0))}
            className="leftArrow"
          >
            <ChevronLeftIcon style={{ fontSize: 24 }} />
          </div>
        )}

        {slideIndex + 3 < filteredReports.length && (
          <div
            onClick={() =>
              setSlideIndex((prev) =>
                Math.min(prev + 1, filteredReports.length - 3)
              )
            }
            className="rightArrow"
          >
            <ChevronRightIcon style={{ fontSize: 24 }} />
          </div>
        )}

        <Box flex="1" bg="#FFFFFF" p={6} borderRadius="xl">
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
            {currentReports.length > 0 ? (
              currentReports.map((report) => (
                <ReportContent
                  key={report.id}
                  report={report}
                  onExpand={handleExpand}
                />
              ))
            ) : (
              <Box colSpan={3} textAlign="center" py={10}>
                <Text>No reports available</Text>
              </Box>
            )}
          </Grid>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent
          maxH="84vh"
          display="flex"
          flexDirection="column"
          padding={"10px"}
        >
          <ModalHeader>Report</ModalHeader>
          <ModalCloseButton />
          {expandedReport && (
            <>
              <Text fontWeight="semibold" ml={6} mb={3}>
                {dayjs(expandedReport.date).format("D MMMM YYYY")},{" "}
                {expandedReport.time}
              </Text>
              <Divider />
              <ModalBody overflowY="auto" flex="1">
                <Box>
                  <Image
                    src={expandedReport.image}
                    alt="Expanded Report"
                    className="modalReportImage"
                  />
                  <Box>
                    <Heading size="sm" mb={2}>
                      Suggestion
                    </Heading>
                    <List spacing={1} styleType="disc" pl={8}>
                      {expandedReport.description?.map((item, idx) => (
                        <ListItem key={idx} color="#6A7078">
                          {item}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </ModalBody>
              <Divider />
              <ModalFooter>
                <Flex ml="auto" gap={10}>
                  <img src={Images.print_icon} alt="Print" className="actionIcon" />
                  <img src={Images.mail_icon} alt="Mail" className="actionIcon" />
                  <img src={Images.download_icon} alt="Download" className="actionIcon" />
                </Flex>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ReportContainer;
