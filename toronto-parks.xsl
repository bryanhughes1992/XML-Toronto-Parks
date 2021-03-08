<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <!--Associates the template with the root of the XML source document-->
  <xsl:template match="/">
    <html>
      <body>
        <!--For each location with an ID equal to nine, select all-->
        <xsl:for-each select="//Location[LocationID=9]"><xsl:apply-templates select="."></xsl:apply-templates></xsl:for-each>
      </body>
    </html>
  </xsl:template>
  <!--Match the XML element 'Location'-->
  <xsl:template match="Location">
    <!--A header with the value of the 'LocationName'-->
    <h1><xsl:value-of select="LocationName"></xsl:value-of></h1>
    <!--A paragraph with the text content of 'Address'-->
    <p>Location: <xsl:value-of select="Address"></xsl:value-of></p>
    <!--Another paragraph with the text content of 'PhoneNumber'-->
    <p><xsl:value-of select="PhoneNumber"></xsl:value-of></p>
    <h2>Facilities</h2>
    <ul>
      <!--For each facility in the parent Facilities-->
      <xsl:for-each select="Facilities/Facility">
        <!--If the FacilityName has a value, display this information-->
        <xsl:choose>
          <xsl:when test="FacilityName">
            <li><xsl:value-of select="FacilityDisplayName"></xsl:value-of> - <xsl:value-of select="FacilityName"></xsl:value-of>
            </li>
          </xsl:when>
          <!--Otherwise, display on the 'FacilityDisplayName'-->
          <xsl:otherwise>
            <li><xsl:value-of select="FacilityDisplayName"></xsl:value-of></li>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:for-each>
    </ul>
  </xsl:template>
</xsl:stylesheet>